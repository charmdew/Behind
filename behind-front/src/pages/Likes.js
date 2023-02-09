import axios from 'axios';
import jwt_decode from 'jwt-decode';

import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import { Box, Text } from '@chakra-ui/react';
import {
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import LikesProfileList from '../components/LikesProfileList';
import { UsersStateContext } from '../App';

export const DetectorStateContext = React.createContext();
export const DetectorDispatchContext = React.createContext();

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

const Likes = ({}) => {
  const { id } = useParams();
  const { loginUser } = useContext(UsersStateContext);
  const LoginUserId = loginUser.id;
  const token = getCookie('token');
  // const LoginUserId = jwt_decode(token).sub;
  console.log(id);
  const navigate = useNavigate();

  const Back_Word = () => {
    if (parseInt(id) === parseInt(LoginUserId)) {
      return 'My Likes';
    } else {
      // 이 id에 해당하는 사람의 이름으로 수정해야 함
      return `${id}'s Likes`;
    }
  };

  const [changeDetector, setChangeDetector] = useState(0);

  const DetectorState = useMemo(
    () => ({
      changeDetector,
    }),
    [changeDetector]
  );
  const DetectorDispatches = useMemo(() => {
    return { setChangeDetector };
  }, []);

  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const getfollowList = async () => {
    const followingtempList = [];
    const followertempList = [];
    const response = await axios.get(`api/users/${id}`, {
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
    });
    const followingUsers = response.data.followingUsers;
    const followedUsers = response.data.followedUsers;
    for (const ID of followingUsers) {
      const userInfo = await axios.get(`api/users/${ID}`, {
        headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
      });
      followingtempList.push(userInfo.data);
    }
    for (const ID of followedUsers) {
      const userInfo = await axios.get(`api/users/${ID}`, {
        headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
      });
      followertempList.push(userInfo.data);
    }
    setFollowingList(followingtempList);
    setFollowerList(followertempList);
  };

  console.log('followingList', followingList);
  console.log('followerList', followerList);

  useEffect(() => {
    getfollowList();
  }, [LoginUserId]);

  useEffect(() => {
    getfollowList();
  }, [changeDetector]);

  return (
    <DetectorStateContext.Provider value={DetectorState}>
      <DetectorDispatchContext.Provider value={DetectorDispatches}>
        <Box alignItems="center" display="flex" w="100%" bg="gray.100">
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
            size="lg"
            icon={<FiArrowLeft />}
          />
          <Text as="b">{Back_Word()}</Text>
        </Box>

        <Tabs bg="white" isFitted variant="solid-rounded" colorScheme="yellow">
          <TabList>
            <Tab fontSize="xl">Following</Tab>
            <Tab fontSize="xl">Follower</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="0">
              <LikesProfileList userList={followingList} />
            </TabPanel>
            <TabPanel p="0">
              <LikesProfileList userList={followerList} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DetectorDispatchContext.Provider>
    </DetectorStateContext.Provider>
  );
};

export default Likes;
