import tensorflow as tf
import tensorflow_hub as hub
from PIL import Image
import numpy as np
import os, time, io, base64


def main(input_image, input_image_fname):
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

    # 변환할 이미지 크기 조정
    width, height = content_image.size
    content_image = np.array(content_image)
    x_test = np.array([content_image])
    x_test = x_test / 255
    content_image = x_test

    ##### 스타일 이미지 지정 #####
    # 스타일 이미지 파일 저장 경로
    STYLE_IMG_FOLDER = os.path.join('static', 'images', 'style')
    # 스타일 이미지 파일명
    style_image_file = 'candinsky.jpg'

    style_image = Image.open(os.path.join(STYLE_IMG_FOLDER, style_image_file))

    # Optionally resize the images. It is recommended that the style image is about
    # 256 pixels (this size was used when training the style transfer network).
    # The content image can be any size.
    style_image = style_image.resize((width, height))
    style_image = np.array(style_image)
    x_test = np.array([style_image])
    x_test = x_test / 255
    style_image = x_test

    ##### 이미지 변환 수행 #####
    dict_output = model.predict({'placeholder': content_image, 'placeholder_1': style_image})

    ##### 변환된 이미지 #####
    y_predict = dict_output['output_0']
    styled_image = y_predict[0]
    styled_image = (styled_image * 255).astype(np.uint8)
    styled_image = Image.fromarray(styled_image)

    ## 이미지 데이터 JSON으로 응답
    bytesIO = io.BytesIO()
    styled_image.save(bytesIO, "JPEG")
    b64encoded = base64.b64encode(bytesIO.getvalue())

    ## 결과 이미지 지정한 경로에 저장
    # 결과 이미지 파일명 : 파일이름_스타일이름.확장자
    styled_image_fname = input_image_fname.split('.')[0] + "_" + style_image_file
    # styled_image_fname = content_image_file.split('.')[0] + "_" + style_image_file
    # 결과 이미지 저장 경로
    styled_path = os.path.join('static', 'images', 'output', styled_image_fname)
    print(styled_path)
    # 결과 이미지 저장
    styled_image.save(styled_path, 'JPEG')

    # 종료 시간
    end = time.time()
    # 이미지 변환 수행 시간 측정
    print("Total time: {:.1f}".format(end - start))

    # return b64encoded             # base64로 인코딩한 이미지
    return round(end - start, 1)    # 변환하는데 걸린 시간 (임시)


def main_multiple_styles(input_image, input_image_fname):
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

    # 변환할 이미지 크기 조정
    width, height = content_image.size
    content_image = np.array(content_image)
    x_test = np.array([content_image])
    x_test = x_test / 255
    content_image = x_test

    ##### 스타일 이미지 지정 #####
    # 스타일 이미지 파일 저장 경로
    STYLE_IMG_FOLDER = os.path.join('static', 'images', 'style')
    # 스타일 이미지 파일명
    style_image_files = ['marilyn.jpg', 'starry_night.jpg', 'gogh.jpg', 'scream.jpg', 'girl.jpg', 'monarisa.jpg']
    # base64로 인코딩된 결과 이미지를 저장하는 리스트
    b64encoded_images = []

    for style_image_file in style_image_files:
        style_image = Image.open(os.path.join(STYLE_IMG_FOLDER, style_image_file))

        # Optionally resize the images. It is recommended that the style image is about
        # 256 pixels (this size was used when training the style transfer network).
        # The content image can be any size.
        style_image = style_image.resize((width, height))
        style_image = np.array(style_image)
        x_test = np.array([style_image])
        x_test = x_test / 255
        style_image = x_test

        ##### 이미지 변환 수행 #####
        dict_output = model.predict({'placeholder': content_image, 'placeholder_1': style_image})

        ##### 변환된 이미지 #####
        y_predict = dict_output['output_0']
        styled_image = y_predict[0]
        styled_image = (styled_image * 255).astype(np.uint8)
        styled_image = Image.fromarray(styled_image)

        ## 이미지 데이터 JSON으로 응답
        bytesIO = io.BytesIO()
        styled_image.save(bytesIO, "JPEG")
        b64encoded = base64.b64encode(bytesIO.getvalue())
        # base64로 인코딩된 이미지 리스트에 저장
        b64encoded_images.append(b64encoded)

        ## 결과 이미지 지정한 경로에 저장
        # 결과 이미지 파일명 : 파일이름_스타일이름.확장자
        styled_image_fname = input_image_fname.split('.')[0] + "_" + style_image_file
        # styled_image_fname = content_image_file.split('.')[0] + "_" + style_image_file
        # 결과 이미지 저장 경로
        styled_path = os.path.join('static', 'images', 'output', styled_image_fname)
        print(styled_path)
        # 결과 이미지 저장
        styled_image.save(styled_path, 'JPEG')

    print("Number of Styles: ", len(b64encoded_images))

    # 종료 시간
    end = time.time()
    # 이미지 변환 수행 시간 측정
    print("Total time: {:.1f}".format(end - start))

    return b64encoded_images             # base64로 인코딩한 이미지
    # return round(end - start, 1)    # 변환하는데 걸린 시간 (임시)