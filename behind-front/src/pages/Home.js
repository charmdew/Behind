import axios from 'axios';
import jwt_decode from 'jwt-decode';

import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { Box } from '@chakra-ui/react';

import ProfileList from '../components/ProfileList';
import PositionRadio from '../components/PositionRadio';
import TrackRadio from '../components/TrackRadio';

import { UsersStateContext, UsersDispatchContext } from '../App';
export const FilteredUsersDispatchContext = React.createContext();

function setCookie(cookie_name, value, days) {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  const cookie_value =
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
  useEffect(() => {
    const token = getCookie('token');

    if ((document.cookie.length === 0 || !token) && query.search.length === 0) {
      navigate('/login');
    } else if (
      query.search.length !== 0 &&
      (document.cookie.length === 0 || !document.cookie.token || !token)
    ) {
      const token = query.search.replace('?X-AUTH-TOKEN=', '');
      const LoginUserId = jwt_decode(token).sub;
      setCookie('LoginUserId', `${LoginUserId}`, 1);
      setCookie('token', `${token}`, 1);
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
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const getUserList = () => {
    const token = getCookie('token');
    axios({
      method: 'get',
      url: 'https://i8a404.p.ssafy.io/api/users/search',
      params: {
        position: parseInt(selectedPosition),
        track: parseInt(selectedTrack),
        page: pageNum,
        volume: 4,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': token,
      },
    }).then(res => {
      setPageNum(() => pageNum + 1);
      if (res.data.length === 0) {
        setHasMore(pre => false);
        setUsers(pre => []);
      }
      setUsers(pre => [...users, ...res.data]);
    });
  };

  useEffect(() => {
    getUserList();
  }, [selectedPosition, selectedTrack]);

  const memoizedFilterDispatches = useMemo(() => {
    return {
      setSelectedPosition,
      setSelectedTrack,
      setPageNum,
      setUsers,
      setHasMore,
    };
  }, []);
  return (
    <div>
      <FilteredUsersDispatchContext.Provider value={memoizedFilterDispatches}>
        <Box>
          {/* 포지션,트랙 라디오 */}
          <Box
            pt={{
              base: '5',
              lg: '10',
            }}
            pb={{
              base: '5',
              lg: '10',
            }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            bg="white"
            // borderBottom="solid 40px"

            borderBottom={{
              base: 'solid 20px #4E6C50',
              lg: 'solid 40px #4E6C50',
            }}
          >
            {/* 포지션 */}
            <Box
              mb={{
                base: '3',
                lg: '5',
              }}
            >
              <TrackRadio />
            </Box>
            {/* 트랙 */}
            <Box>
              <PositionRadio />
            </Box>
          </Box>
          <InfiniteScroll
            pageStart={0}
            loadMore={getUserList}
            hasMore={hasMore}
            threshold={250}
            loader={
              <div className="loader" key={0}>
                {/* Loading ... */}
              </div>
            }
            useWindow={true}
          >
            <ProfileList userList={users} />
          </InfiniteScroll>
        </Box>
      </FilteredUsersDispatchContext.Provider>
    </div>
  );
};

export default Home;
