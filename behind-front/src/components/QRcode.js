import { QRCodeCanvas } from 'qrcode.react';
import jwt_decode from 'jwt-decode';

function getCookie(cookie_name) {
  var x, y;
  var val = document.cookie.split(';');

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x == cookie_name) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}

const QRcode = () => {
  const token = getCookie('token');
  if (jwt_decode(token).role === 'TEMP') {
    return (
      <div>
        return <div>회원정보를 입력해 주세요</div>;
      </div>
    );
  } else {
    <QRCodeCanvas value={token} />;
  }
};

export default QRcode;
