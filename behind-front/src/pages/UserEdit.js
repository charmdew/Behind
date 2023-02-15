import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import UserInfo from '../components/UserInfo';

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

const UserEdit = () => {
  const token = getCookie('token');
  const LoginUserId = jwt_decode(token).sub;

  const [loginUserInfo, setLoginUserInfo] = useState({});

  async function getLoginUserInfo() {
    const info = await axios({
      url: `https://i8a404.p.ssafy.io/api/signUp/${LoginUserId}`,
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
    })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.log(error);
      });
    setLoginUserInfo(info);
  }

  useEffect(() => {
    getLoginUserInfo();
  }, []);

  return (
    <Box>
      {Object.keys(loginUserInfo).length !== 0 ? (
        <UserInfo loginUser={loginUserInfo} />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default UserEdit;
