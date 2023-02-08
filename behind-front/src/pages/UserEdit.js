import UserInfo from '../components/UserInfo';
import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
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
  const LoginUserId = getCookie('LoginUserId');

  const [loginUserInfo, setLoginUserInfo] = useState({});
  async function getLoginUserInfo() {
    const info = await axios
      .get(`/api/users/${LoginUserId}`)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.log(err);
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
