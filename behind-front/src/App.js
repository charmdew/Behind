import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Likes from './pages/Likes';
import Detail from './pages/Detail';
import UserEdit from './pages/UserEdit';
import MyPage from './pages/MyPage';

export const UsersStateContext = React.createContext();

const App = () => {
  const [users, setUsers] = useState([]);
  const [loginUser, setLoginUser] = useState({});

  // 1번 id가 로그인 했다고 가정
  useEffect(() => {
    setLoginUser({
      id: 1,
      userId: 'choanury',
      detail: '구로구에 사는 김상식입니다.',
      tag: ['Front', 'JS', 'React'],
      email: 'choanury@naver.com',
      name: '유정훈',
      phoneNum: '01071242201',
      position1: 1,
      position2: 2,
      track1: 1,
      track2: 2,
      images: 'imgs',
      profile: 'profile_img',
      followingUsers: [2, 3, 7],
      followedUsers: [4, 5, 9],
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/users').then(Response => {
      setUsers(Response.data);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <UsersStateContext.Provider value={{ users, loginUser }}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/likes/:id" element={<Likes />}></Route>
              <Route path="/detail/:id" element={<Detail />}></Route>
              <Route path="/useredit" element={<UserEdit />}></Route>
              <Route path="/mypage" element={<MyPage />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </UsersStateContext.Provider>
    </ChakraProvider>
  );
};

export default App;
