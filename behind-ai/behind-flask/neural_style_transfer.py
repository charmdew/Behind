import tensorflow as tf
import tensorflow_hub as hub
from PIL import Image
import numpy as np
import os, time, io, base64, cv2

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # WARNING 로그 필터링
os.environ['TFHUB_MODEL_LOAD_FORMAT'] = 'COMPRESSED'
os.environ["CUDA_VISIBLE_DEVICES"] = "0"


def resize(image, size):
    # 원본 이미지의 크기
    h, w = image.shape[:2]
    ash = size[1] / h
    asw = size[0] / w
    # 리사이즈 처리 (이미지 비율 맞춰 자르기)
    if asw > ash:
        sizeas = (int(w * asw), int(h * asw))
    else:
        sizeas = (int(w * ash), int(h * ash))
    pic = cv2.resize(image, dsize=sizeas)
    resized_image = pic[int(sizeas[1] / 2 - size[1] / 2):int(sizeas[1] / 2 + size[1] / 2),
                    int(sizeas[0] / 2 - size[0] / 2):int(sizeas[0] / 2 + size[0] / 2), :]
    return resized_image


def main_multiple_styles(input_image, input_image_fname, output_fname):
    ##### 모델 로드 #####
    base_model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

    placeholder = tf.keras.layers.Input(shape=(None, None, 3), dtype=tf.float32)
    placeholder_1 = tf.keras.layers.Input(shape=(None, None, 3), dtype=tf.float32)
    net = hub.KerasLayer(base_model, signature='serving_default', signature_outputs_as_dict=True)(
        {'placeholder': placeholder, 'placeholder_1': placeholder_1})
    model = tf.keras.models.Model({'placeholder': placeholder, 'placeholder_1': placeholder_1}, net)

    # 시작 시간
    start = time.time()

    ##### 변환할 이미지 #####
    ## JSON으로 이미지 전달 받는 방법
    # d = request.get_json()
    # file = d['file']
    # bytes = base64.b64decode(file)
    # bytesIO = io.BytesIO(bytes)
    # content_image = Image.open(bytesIO)

    ## form-data로 이미지 전달 받는 방법
    content_image = input_image

    ## 파일 시스템에 있는 이미지 불러오기
    # content_image_file = 'person01.jpg'
    # content_image = Image.open(os.path.join('static', 'images', 'data', content_image_file))

    # 이미지 사이즈 고정
    target_size = (480, 570)

    content_image = np.array(content_image)
    content_image = resize(content_image, target_size)  # 리사이즈 처리
    x_test = np.array([content_image])
    x_test = x_test / 255
    content_image = x_test

    ##### 스타일 이미지 지정 #####
    # 스타일 이미지 파일 저장 경로
    STYLE_IMG_FOLDER = os.path.join('static', 'images', 'style')
    # 스타일 이미지 파일명
    # style_image_files = ['picasso.jpg', 'dalmado.jpg', 'seurat.jpg', 'klimpt.jpg']
    style_image_files = [ 'gogh.jpg', 'udnie.jpg', 'girl.jpg', 'candinsky.jpg']
    # style_image_files = ['starry_night.jpg', 'girl.jpg', 'gogh.jpg', 'marilyn.jpg']
    # style_image_files = ['candinsky.jpg', 'monarisa.jpg', 'rain_princess.jpg', 'scream.jpg']
    # style_image_files = ['candinsky.jpg', 'dalmado.jpg', 'girl.jpg', 'gogh.jpg', 'marilyn.jpg', 'monarisa.jpg',
    #                      'picasso.jpg', 'rain_princess.jpg', 'scream.jpg', 'starry_night.jpg', 'tiger.jpg',
    #                      'zentangle_art.jpg']

    # base64로 인코딩된 결과 이미지를 저장하는 리스트
    b64encoded_images = []

    # 이미지 확장자 지정
    img_format = "JPEG"

    for style_image_file in style_image_files:
        style_image = Image.open(os.path.join(STYLE_IMG_FOLDER, style_image_file))

        # Optionally resize the images. It is recommended that the style image is about
        # 256 pixels (this size was used when training the style transfer network).
        # The content image can be any size.
        style_image = np.array(style_image)
        style_image = resize(style_image, target_size)  # 리사이즈 처리
        x_test = np.array([style_image])
        x_test = x_test / 255
        style_image = x_test

        ##### 이미지 변환 수행 #####
        dict_output = model.predict({'placeholder': content_image, 'placeholder_1': style_image})

        ##### 변환된 이미지 #####
        y_predict = dict_output['output_0']
        styled_image = y_predict[0]
        styled_image = (styled_image * 255).astype(np.uint8)
        styled_image = resize(styled_image, target_size)  # 이미지 크기 조정
        styled_image = Image.fromarray(styled_image)

        ## 이미지 데이터 JSON으로 응답
        bytesIO = io.BytesIO()
        styled_image.save(bytesIO, img_format)
        b64encoded = base64.b64encode(bytesIO.getvalue())
        # base64로 인코딩된 이미지 리스트에 저장
        b64encoded_images.append(b64encoded)
        # # base64로 인코딩된 이미지 딕셔너리에 저장
        # b64encoded_images_dict[style_image_file.split('.')[0]] = b64encoded

        ## 결과 이미지 지정한 경로에 저장
        # 결과 이미지 파일명 : 파일이름_스타일이름.확장자
        styled_image_fname = output_fname + "_" + style_image_file.split('.')[0] + "." + img_format
        # styled_image_fname = input_image_fname.split('.')[0] + "_" + style_image_file
        # styled_image_fname = content_image_file.split('.')[0] + "_" + style_image_file
        # 결과 이미지 저장 경로
        styled_path = os.path.join('static', 'images', 'output', styled_image_fname)
        print(styled_path)
        # 결과 이미지 저장
        # styled_image.save(styled_path, img_format)

    print("Number of Styles: ", len(b64encoded_images))

    # 종료 시간
    end = time.time()
    # 이미지 변환 수행 시간 측정
    print("Total time: {:.1f}".format(end - start))

    return b64encoded_images  # base64로 인코딩한 이미지
    # return round(end - start, 1)    # 변환하는데 걸린 시간 (임시)

# main_multiple_styles(Image.open(os.path.join('static', 'images', 'data', 'person01.jpg')), 'person01.jpg')
