import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ChakraProvider, theme } from '@chakra-ui/react';

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
  // 로그인한 유저id 저장
  const [loginUser, setLoginUser] = useState({});
  const LoginUserId = getCookie('LoginUserId');
  const token = getCookie('token');

  useEffect(() => {
    axios.get(`/api/users/${LoginUserId}`).then(response => {
      setLoginUser(response.data);
    });
  }, []);

  const refreshLoginUserInfo = LoginUserId => {
    console.log('refresh', LoginUserId);
    axios.get(`/api/users/${LoginUserId}`).then(response => {
      setLoginUser(response.data);
    });
  };

  const value = useMemo(
    () => ({
      loginUser,
    }),
    [loginUser]
  );

  const memoizedDispatches = useMemo(() => {
    return { refreshLoginUserInfo, setLoginUser };
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
