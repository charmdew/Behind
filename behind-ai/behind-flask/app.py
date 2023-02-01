from flask import Flask, request, jsonify
from PIL import Image
import json

import neural_style_transfer

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/nst', methods=['POST'])
def nst():
    return "Neural Style Transfer!"


@app.route('/nst/test', methods=['POST'])
def nst_test():
    # 파일 받기
    content_file = request.files['file']

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


if __name__ == '__main__':
    app.run()
