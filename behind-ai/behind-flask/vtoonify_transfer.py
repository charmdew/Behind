import os
import time
import numpy as np
import cv2
import dlib
import torch
from torchvision import transforms
import torch.nn.functional as F
from PIL import Image
import io, base64

from VToonify.model.vtoonify import VToonify
from VToonify.model.bisenet.model import BiSeNet
from VToonify.model.encoder.align_all_parallel import align_face
from VToonify.util import load_psp_standalone, get_video_crop_parameter, tensor2cv2

from common.errors import CustomException

os.environ['CUDA_VISIBLE_DEVICES'] = "0"

CODE_DIR = 'VToonify'
IMAGE_DIR = 'static/images'

# device = 'cpu'
device = 'cuda'

MODEL_DIR = os.path.join(os.getcwd(), CODE_DIR, 'checkpoint')
DATA_DIR = os.path.join(os.getcwd(), IMAGE_DIR, 'data')
OUT_DIR = os.path.join(os.getcwd(), IMAGE_DIR, 'output')

""" 
cartoon026:      beautiful
*cartoon064:      princess-like
*cartoon153:      masculine
cartoon299:      big eyes 
*cartoon008:      handsome
arcane000:       for female 
arcane077:       for male 
pixar052:                
caricature039:   big mouth 
caricature068:   slim  
comic028
illustration050
illustration136

* 항목은 아직 모델파일 없음!
"""

# 필터 스타일 지정
# style_types = ['cartoon026', 'cartoon299',
#              'arcane000', 'arcane077',
#              'pixar052',
#              'caricature039','caricature068',
#              'comic028',
#              'illustration004', 'illustration009', 'illustration043', 'illustration050',
#              'illustration054','illustration057','illustration086','illustration136']
groups = [
    ['arcane000', 'arcane077', 'caricature039', 'caricature068'],
    ['cartoon026', 'cartoon299', 'comic028', 'pixar052'],
    ['illustration004', 'illustration009', 'illustration043', 'illustration050'],
    ['illustration054', 'illustration057', 'illustration086', 'illustration136'],
    ['cartoon026', 'comic028', 'illustration004', 'illustration054']
]

style_types = groups[-1]

##### 'VToonify/checkpoint/' 폴더에 필요한 파일 목록 #####
## faceparsing.pth, shape_predictor_68_face_landmarks.dat, encoder.pt
## 스타일코드_generator.pt, 스타일_exstyle_code.npy
## => ex) arcane000_generator.pt, arcane077.generator.pt, arcane_exstyle_code.npy

# ============================================== 공통 ==============================================
# Compose를 활용하여 여러 개의 transform을 묶을 수 있음
transform = transforms.Compose([
    transforms.ToTensor(),  # 이미지를 Pytorch tensors 타입으로 변형
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),  # 텐서를 가져와 평균 및 표준 편차로 정규화함
])

## faceparsing.pth, shape_predictor_68_face_landmarks.dat, encoder.pt
parsingpredictor = BiSeNet(n_classes=19)
parsingpredictor.load_state_dict(
    torch.load(os.path.join(MODEL_DIR, 'faceparsing.pth'), map_location=lambda storage, loc: storage))
# 추론을 실행하기 전에 model.eval()을 호출하여 드롭아웃(dropout)과 배치 정규화 층(batch normalization layers)을 평가(evaluation) 모드로 바꿔야 함!
parsingpredictor.to(device).eval()

modelname = os.path.join(MODEL_DIR, 'shape_predictor_68_face_landmarks.dat')

landmarkpredictor = dlib.shape_predictor(modelname)

pspencoder = load_psp_standalone(os.path.join(MODEL_DIR, 'encoder.pt'), device)
# =================================================================================================

##### 스타일 변환 모델 불러오기 ##### 
# 모델 리스트 저장
N = len(style_types)
vtoonify = [VToonify(backbone='dualstylegan') for _ in range(N)]
exstyle = [0] * N

start = time.time()  # 시작

## 스타일코드_generator.pt, 스타일_exstyle_code.npy
for i, style_type in enumerate(style_types):
    # 사용하고자 하는 GPU 장치 번호를 지정합니다.
    vtoonify[i].load_state_dict(
        torch.load(os.path.join(MODEL_DIR, style_type + '_generator.pt'), map_location=lambda storage, loc: storage)[
            'g_ema'])
    print("model file name:", style_type, 'generator')

    # model.to(torch.device('cuda')) : CUDA에 최적화된 모델로 변환됨
    # vtoonify[i].to(torch.device(device))
    vtoonify[i].to(device)

    exstyles = np.load(os.path.join(MODEL_DIR, style_type[:-3] + '_exstyle_code.npy'), allow_pickle='TRUE').item()
    stylename = list(exstyles.keys())[int(style_type[-3:])]
    print("style name:", stylename)
    exstyle[i] = torch.tensor(exstyles[stylename]).to(device)

    with torch.no_grad():
        exstyle[i] = vtoonify[i].zplus2wplus(exstyle[i])

    print('Model successfully loaded!')

print("=====================================================================================================")
print("학습된 모델 불러오는데 걸리는 시간")
print(f"{time.time() - start:.4f} sec")  # 종료와 함께 수행시간 출력


# 이미지 크기 조정
def resize(image, size):
    # 원본 이미지의 크기
    h, w = image.shape[:2]
    ash = size[1] / h
    asw = size[0] / w

    # 이미지 비율 맞춰 자르기
    if asw > ash:
        sizeas = (int(w * asw), int(h * asw))
    else:
        sizeas = (int(w * ash), int(h * ash))
    pic = cv2.resize(image, dsize=sizeas)
    resized_image = pic[int(sizeas[1] / 2 - size[1] / 2):int(sizeas[1] / 2 + size[1] / 2),
                    int(sizeas[0] / 2 - size[0] / 2):int(sizeas[0] / 2 + size[0] / 2), :]

    # # 이미지 비율 맞춰 축소
    # base_pic = np.zeros((size[1], size[0], 3), np.uint8)
    # if asw < ash:
    #     sizeas = (int(w*asw), int(h*asw))
    # else:
    #     sizeas = (int(w*ash), int(h*ash))
    # print(sizeas)
    # pic = cv2.resize(styled_image, dsize = sizeas)
    # print(pic.shape)
    # print(base_pic.shape)
    # base_pic[int(size[1] / 2 - sizeas[1] / 2):int(size[1] / 2 + sizeas[1] / 2),
    # int(size[0] / 2 - sizeas[0] / 2):int(size[0] / 2 + sizeas[0] / 2), :] = pic

    return resized_image


def main(input_image, input_image_fname, ouput_fname):
    # 변환할 이미지 파일
    content_image = input_image
    input_file_name = input_image_fname

    # 이미지 사이즈 고정
    target_size = (480, 570)

    ##### 이미지 전처리 #####
    frame = np.array(content_image)
    # frame = resize(frame, target_size)  # 리사이즈 처리

    scale = 1
    kernel_1d = np.array([[0.125], [0.375], [0.375], [0.125]])
    # We detect the face in the image, and resize the image so that the eye distance is 64 pixels.
    # Centered on the eyes, we crop the image to almost 400x400 (based on args.padding).
    paras = get_video_crop_parameter(frame, landmarkpredictor, padding=[200, 200, 200, 200])  # => 이렇게 하면 얼굴에 조금 더 초점을 맞추어 자름, 숫자가 클수록 더 넓은 범위의 사진을 처리함
    # paras = get_video_crop_parameter(frame, landmarkpredictor, padding=[250, 250, 250, 250])
    if paras is not None:
        h, w, top, bottom, left, right, scale = paras
        H, W = int(bottom - top), int(right - left)
        # for HR image, we apply gaussian blur to it to avoid over-sharp stylization results
        if scale <= 0.75:
            frame = cv2.sepFilter2D(frame, -1, kernel_1d, kernel_1d)
        if scale <= 0.375:
            frame = cv2.sepFilter2D(frame, -1, kernel_1d, kernel_1d)
        frame = cv2.resize(frame, (w, h))[top:bottom, left:right]
        x = transform(frame).unsqueeze(dim=0).to(device)
    else:
        print('no face detected!')
        raise CustomException("No face detected!")

    ##### 이미지 변환 #####
    start = time.time()  # 시작

    y_tilde = [0] * N
    with torch.no_grad():
        for i in range(N):
            I = align_face(frame, landmarkpredictor)
            I = transform(I).unsqueeze(dim=0).to(device)
            s_w = pspencoder(I)
            s_w = vtoonify[i].zplus2wplus(s_w)
            s_w[:, :7] = exstyle[i][:, :7]
            # parsing network works best on 512x512 images, so we predict parsing maps on upsmapled frames
            # followed by downsampling the parsing maps
            x_p = F.interpolate(
                parsingpredictor(2 * (F.interpolate(x, scale_factor=2, mode='bilinear', align_corners=False)))[0],
                scale_factor=0.5, recompute_scale_factor=False).detach()
            # we give parsing maps lower weight (1/16)
            inputs = torch.cat((x, x_p / 16.), dim=1)
            # d_s has no effect when backbone is toonify
            y_tilde[i] = vtoonify[i](inputs, s_w.repeat(inputs.size(0), 1, 1), d_s=0.5)
            y_tilde[i] = torch.clamp(y_tilde[i], -1, 1)

    total_time = round(time.time() - start, 4)
    print("=====================================================================================================")
    print("이미지 변환하는데 걸리는 시간")
    print(f"{total_time:.4f} sec")  # 종료와 함께 수행시간 출력

    ##### 결과 처리 #####

    # 변환된 이미지 저장
    result_img = []

    # base64로 인코딩된 결과 이미지를 저장하는 리스트
    b64encoded_images = []

    # 이미지 확장자 지정
    img_format = "JPEG"

    for i in range(N):
        # 변환한 이미지 저장
        result_img.append(tensor2cv2(y_tilde[i][0].cpu()))

        ## 리사이즈 처리
        result_img[i] = resize(result_img[i], target_size)

        # '파일이름_스타일타입.확장자' 형식으로 저장
        # cv2.imwrite(os.path.join(OUT_DIR, ouput_fname + '_' + style_types[i] + '.' + img_format), result_img[i])
        # cv2.imwrite(os.path.join(OUT_DIR, input_file_name[:-4] + '_' + style_types[i] + '.' + img_format), result_img[i])

        # 색상 표현 방식 변경
        styled_image = cv2.cvtColor(result_img[i], cv2.COLOR_BGR2RGB)

        ## 이미지 데이터 JSON으로 응답
        styled_image = Image.fromarray(styled_image)
        bytesIO = io.BytesIO()
        styled_image.save(bytesIO, img_format)
        b64encoded = base64.b64encode(bytesIO.getvalue())
        # base64로 인코딩된 이미지 리스트에 저장
        b64encoded_images.append(b64encoded)

    return b64encoded_images
