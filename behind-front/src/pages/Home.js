import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';

import { Box } from '@chakra-ui/react';

import ProfileList from '../components/ProfileList';
import PositionRadio from '../components/PositionRadio';
import TrackRadio from '../components/TrackRadio';

import { UsersStateContext, UsersDispatchContext } from '../App';
export const FilteredUsersDispatchContext = React.createContext();

function setCookie(cookie_name, value, days) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  var cookie_value =
    escape(value) +
    (days == null ? '' : '; path=/' + '; expires=' + exdate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
}

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

const Home = () => {
  console.log('home 렌더링');
  const navigate = useNavigate();
  const query = useLocation();
  useEffect(() => {
    const token = getCookie('token');

    if ((document.cookie.length === 0 || !token) && query.search.length === 0) {
      console.log('로그인 페이지로');
      navigate('/login');
    } else if (
      query.search.length !== 0 &&
      (document.cookie.length === 0 || !document.cookie.token || !token)
    ) {
      console.log('토큰 설정 후 홈 렌더링');
      const token = query.search.replace('?X-AUTH-TOKEN=', '');
      const LoginUserId = jwt_decode(token).sub;
      console.log(token);
      setCookie('LoginUserId', `${LoginUserId}`, '1');
      setCookie('token', `${token}`, '1');
      if (jwt_decode(token).role === 'TEMP') {
        navigate('/useredit', { replace: true });
      }
    } else if (
      query.search.length === 0 &&
      !(document.cookie.length === 0 || !document.cookie.token || !token)
    ) {
      const token = getCookie('token');
      const LoginUserId = jwt_decode(token).sub;
    } else {
      const token = getCookie('token');
      const LoginUserId = jwt_decode(token).sub;
    }
  }, []);

  const [users, setUsers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);

  useEffect(() => {
    const token = getCookie('token');
    axios({
      method: 'get',
      url: 'api/users/search',
      params: {
        position: parseInt(selectedPosition),
        track: parseInt(selectedTrack),
      },
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': token,
      },
    }).then(res => {
      setUsers(res.data);
    });
  }, [selectedPosition, selectedTrack]);

  const memoizedFilterDispatches = useMemo(() => {
    return { setSelectedPosition, setSelectedTrack };
  }, []);
  return (
    <div>
      <FilteredUsersDispatchContext.Provider value={memoizedFilterDispatches}>
        <Box>
          {/* 포지션,트랙 라디오 */}
          <Box
            pt="10"
            pb="10"
            display="flex"
            flexDirection="column"
            alignItems="center"
            bg="white"
            borderBottom="solid 40px"
            borderBottomColor="#4E6C50"
          >
            {/* 포지션 */}
            <Box mb="5">
              <PositionRadio />
            </Box>
            {/* 트랙 */}
            <Box>
              <TrackRadio />
            </Box>
          </Box>
          <ProfileList userList={users} />
        </Box>
      </FilteredUsersDispatchContext.Provider>
    </div>
  );
};

export default Home;
