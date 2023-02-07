import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useMemo, useContext } from 'react';

import ProfileList from '../components/ProfileList';
import PositionRadio from '../components/PositionRadio';
import TrackRadio from '../components/TrackRadio';

import { Box } from '@chakra-ui/react';
import { UsersStateContext, UsersDispatchContext } from '../App';
export const FilteredUsersDispatchContext = React.createContext();

function setCookie(cookie_name, value, days) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  var cookie_value =
    escape(value) + (days == null ? '' : '; expires=' + exdate.toUTCString());
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
  const navigate = useNavigate();
  const query = useLocation();
  const { setLoginUser } = useContext(UsersDispatchContext);
  const LoginUserId = getCookie('LoginUserId');
  const token = getCookie('token');
  console.log(token);
  useEffect(() => {
    if (document.cookie.length === 0) {
      navigate('/login');
      console.log('쿼리 없음');
    } else {
      if (!token || !document.cookie.token) {
      } else {
      }
      if (query.search.length === 0 && token) {
        axios.get(`/api/users/${loginUserId}`).then(response => {
          console.log(response.data);
          setLoginUser(response.data);
        });
      } else if (
        query.search.length !== 0 &&
        (!token || !document.cookie.token)
      ) {
        console.log('쿼리 있음');
        // '?id=', '&X-AUTH-TOKEN'
        const regex = /\?|id=|\&X-AUTH-TOKEN=/;
        // '?id=', '&X-AUTH-TOKEN' 구분자로 자르기
        const values = query.search.split(regex);
        // 배열에서 undefined를 포함한 0, null, false 제거
        const result = values.filter(values => values);
        const loginUserId = result[0];
        const token = result[1];
        setCookie('LoginUserId', `${loginUserId}`, '1');
        setCookie('token', `${token}`, '1');
      }
    }
  }, []);

  const { loginUser } = useContext(UsersStateContext);
  const [followingIdList, setFollowingIdList] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('api/users').then(response => {
      setUsers(response.data);
    });
    axios.get(`/api/users/${LoginUserId}`).then(response => {
      setFollowingIdList(response.data.followingUsers);
    });
  }, [loginUser]);

  const [selectedPosition, setSelectedPosition] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'api/users/search',
      params: {
        position: parseInt(selectedPosition),
        track: parseInt(selectedTrack),
      },
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      setUsers(res.data);
    });
  }, [selectedPosition, selectedTrack]);

  const memoizedFilterDispatches = useMemo(() => {
    return { setSelectedPosition, setSelectedTrack };
  }, []);

  if (users.length !== 0 && followingIdList) {
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
            <ProfileList userList={users} followingIdList={followingIdList} />
          </Box>
        </FilteredUsersDispatchContext.Provider>
      </div>
    );
  }
};

export default Home;
