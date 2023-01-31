import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ChakraProvider, theme } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Likes from './pages/Likes';
import Detail from './pages/Detail';
import UserEdit from './pages/UserEdit';
import MyPage from './pages/MyPage';

export const UsersStateContext = React.createContext();
export const UsersDispatchContext = React.createContext();

const App = () => {
  const [users, setUsers] = useState([]);
  // 로그인한 유저id 저장
  const [loginUser, setLoginUser] = useState({});
  // 1번 id가 로그인 했다고 가정
  useEffect(() => {
    axios.get('http://localhost:3001/users/1').then(response => {
      setLoginUser(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/users').then(response => {
      setUsers(response.data);
    });
  }, []);

  const value = useMemo(
    () => ({
      users,
      loginUser,
    }),
    [users, loginUser]
  );

  const refreshLoginUserInfo = () => {
    axios.get('http://localhost:3001/users/1').then(response => {
      setLoginUser(response.data);
    });
  };

  const memoizedDispatches = useMemo(() => {
    return { refreshLoginUserInfo };
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
