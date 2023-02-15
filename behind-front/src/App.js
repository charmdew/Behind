import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ChakraProvider, theme, extendTheme } from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Likes from './pages/Likes';
import Detail from './pages/Detail';
import UserEdit from './pages/UserEdit';
import MyPage from './pages/MyPage';
import Login from './pages/Login';

export const UsersStateContext = React.createContext();
export const UsersDispatchContext = React.createContext();

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

const App = () => {
  const breakpoints = {
    lg: '1024px',
  };

  const theme = extendTheme({
    breakpoints,
  });

  // 로그인한 유저id 저장
  const [loginUser, setLoginUser] = useState({});
  // const token = getCookie('token');
  const getUser = () => {
    const token = getCookie('token');
    if (token) {
      const LoginUserId = jwt_decode(token).sub;
      axios({
        // url: `api/users/${LoginUserId}`,
        url: `https://i8a404.p.ssafy.io/api/users/${LoginUserId}`,
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
      })
        .then(response => {
          setLoginUser(response.data);
        })
        .catch(function (error) {
          // 오류발생시 실행
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (document.cookie.length !== 0) {
      getUser();
    }
  }, []);

  const refreshLoginUserInfo = LoginUserId => {
    const token = getCookie('token');
    axios({
      url: `https://i8a404.p.ssafy.io/api/users/${LoginUserId}`,
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
    })
      .then(response => {
        setLoginUser(response.data);
      })
      .catch(function (error) {
        // 오류발생시 실행
        console.log(error);
      });
  };

  const value = useMemo(
    () => ({
      loginUser,
    }),
    [loginUser]
  );
  const memoizedDispatches = useMemo(() => {
    return { refreshLoginUserInfo, setLoginUser, getUser };
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <UsersStateContext.Provider value={value}>
        <UsersDispatchContext.Provider value={memoizedDispatches}>
          <BrowserRouter>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/likes/:id" element={<Likes />}></Route>
                <Route path="/detail/:id" element={<Detail />}></Route>
                <Route path="/useredit" element={<UserEdit />}></Route>
                <Route path="/mypage" element={<MyPage />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        </UsersDispatchContext.Provider>
      </UsersStateContext.Provider>
    </ChakraProvider>
  );
};
export default App;
