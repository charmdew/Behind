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

// function setCookie(cookie_name, value, days) {
//   var exdate = new Date();
//   exdate.setDate(exdate.getDate() + days);
//   // 설정 일수만큼 현재시간에 만료값으로 지정

//   var cookie_value =
//     escape(value) +
//     (days == null ? '' : '; path=/' + '; expires=' + exdate.toUTCString());
//   document.cookie = cookie_name + '=' + cookie_value;
// }

function setCookie(cookie_name, value, miuntes) {
  const exdate = new Date();
  exdate.setMinutes(exdate.getMinutes() + miuntes);
  const cookie_value =
    escape(value) +
    (miuntes == null ? '' : '; expires=' + exdate.toUTCString());
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
    // console.log('getCookie(token)', getCookie(token));
    // console.log('document.cookie', document.cookie);
    // console.log('document.cookie.length', document.cookie.length);
    // console.log('document.cookie.token', document.cookie.token);
    // console.log('typeof(document.cookie.token)', typeof document.cookie.token);
    // console.log('document.cookie.token', !!document.cookie.token);
    // console.log('token', token);
    // console.log('typeof(token)', typeof token);
    // console.log('token', !!token);

    if ((document.cookie.length === 0 || !token) && query.search.length === 0) {
      navigate('/login');
    } else if (
      query.search.length !== 0 &&
      (document.cookie.length === 0 || !document.cookie.token || !token)
    ) {
      const token = query.search.replace('?X-AUTH-TOKEN=', '');
      const LoginUserId = jwt_decode(token).sub;
      setCookie('LoginUserId', `${LoginUserId}`, 30);
      setCookie('token', `${token}`, 30);
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

  console.log('hasMore', hasMore);
  const getUserList = () => {
    const token = getCookie('token');
    axios({
      method: 'get',
      url: 'api/users/search',
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
      // console.log(res.data);
      console.log('users', users);
      if (res.data.length === 0) {
        console.log('빈 리스트 받음');
        setHasMore(pre => false);
        setUsers(pre => []);
        // console.log('hasMore', hasMore);
        console.log('users', users);
      }
      setUsers(pre => [...users, ...res.data]);
      // console.log('hasMore', hasMore);
      console.log('users', users);
      console.log('selectedPosition', selectedPosition);
      console.log('selectedTrack', selectedTrack);
      console.log('pageNum', pageNum);
    });
  };

  useEffect(() => {
    setUsers(pre => []);
    setPageNum(pre => 0);
    setHasMore(pre => true);
    getUserList();
    console.log('FAEFAEFAEFAEGAERGAERVGAGF');
    // console.log('hasMore', hasMore);
    console.log('users', users);
    console.log('selectedPosition', selectedPosition);
    console.log('selectedTrack', selectedTrack);
    console.log('pageNum', pageNum);
  }, [selectedPosition, selectedTrack]);

  // useEffect(() => {
  //   if
  // }, [hasMore]);

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
