from flask import Flask, request, jsonify
from PIL import Image
import json, base64, io
from flask_cors import CORS, cross_origin
from waitress import serve

import neural_style_transfer
import vtoonify_transfer

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():  # put application's code here
    return '<h1>Hello World!</h1>'


@app.route('/nst', methods=['GET'])
def nst():
    return "<h1>Neural Style Transfer!</h1>"


@app.route('/nst/test', methods=['POST'])
def nst_test():
    # 파일 받기
    content_file = request.files['photo']

    # 변환할 이미지
    content_image = Image.open(content_file.stream)

    ##### 결과 이미지 데이터 #####
    # # 변환된 이미지
    # styled_image_data = neural_style_transfer.main(content_image, content_file.filename).decode("utf-8")
    # # 이미지 데이터를 JSON으로 응답하는 경우
    # return json.dumps({"image": styled_image_data})
    # return jsonify({
    #     'msg': 'success',
    #     'size': content_image.size,
    #     'format': 'JPEG',
    #     'image': styled_image_data
    # })

    ##### 걸린 시간 (테스트용) #####
    # 변환하는데 걸린 시간 반환 (테스트용)
    time = neural_style_transfer.main(content_image, content_file.filename)
    return json.dumps({"[Success] Total time": time})


# 여러 스타일을 적용하여 이미지 변환
@app.route('/nst', methods=['POST'])
def nst_multiple():
    # d = request.get_json()
    # file = d['photo']
    # bytes = base64.b64decode(file)
    # bytesIO = io.BytesIO(bytes)
    # content_image = Image.open(bytesIO)

    # 파일 받기
    content_file = request.files['photo']

    # 변환할 이미지
    content_image = Image.open(content_file.stream)

    ##### 결과 이미지 데이터 #####
    # 변환된 이미지
    b64encoded_images = neural_style_transfer.main_multiple_styles(content_image, content_file.filename)

    # base64로 인코딩된 문자열을 디코딩
    styled_image_data = [b64encoded.decode("utf-8") for b64encoded in b64encoded_images]

    # 이미지 데이터를 JSON으로 응답하는 경우
    # return json.dumps({"images": styled_image_data})
    return jsonify({"images": styled_image_data})
    # return jsonify({
    #     'msg': 'success',
    #     'size': content_image.size,
    #     'format': 'JPEG',
    #     'image': styled_image_data
    # })

    # ##### 걸린 시간 (테스트용) #####
    # # 변환하는데 걸린 시간 반환 (테스트용)
    # time = neural_style_transfer.main_multiple_styles(content_image, content_file.filename)
    #
    # return json.dumps({"[Success] Total time": time})


@app.route('/vtoonify', methods=['POST'])
def vtoonify():
    # d = request.get_json()
    # file = d['photo']
    # bytes = base64.b64decode(file)
    # bytesIO = io.BytesIO(bytes)
    # content_image = Image.open(bytesIO)

    # 파일 받기
    content_file = request.files['photo']

    # 변환할 이미지
    content_image = Image.open(content_file.stream)

    # ##### 결과 이미지 데이터 #####
    # # 변환된 이미지
    b64encoded_images = vtoonify_transfer.main(content_image, content_file.filename)

    # # base64로 인코딩된 문자열을 디코딩
    styled_image_data = [b64encoded.decode("utf-8") for b64encoded in b64encoded_images]

    # # 이미지 데이터를 JSON으로 응답하는 경우
    # # return json.dumps({"images": styled_image_data})
    return jsonify({"images": styled_image_data})

    # ##### 변환하는데 걸린 시간 #####
    # total_time = vtoonify_transfer.main(content_image, content_file.filename)
    # return jsonify({"total_time(sec)": total_time})


mode = "dev"

if __name__ == '__main__':
    if mode == "dev":
        app.run(host='0.0.0.0', port=5000, debug=True)
    else:
        # serve(app, host='0.0.0.0', port=5000, threads=4, url_prefix="/my-app")
        serve(app, host='0.0.0.0', port=5000, thread=4)

