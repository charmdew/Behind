import React, { useContext, useEffect, useState } from 'react';
import { UsersStateContext } from '../App';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

import ProfileList from '../components/ProfileList';
import {
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import axios from 'axios';

const Likes = ({}) => {
  const { id } = useParams();
  const { loginUser } = useContext(UsersStateContext);
  const loginUserId = loginUser.id;
  const navigate = useNavigate();

  const Back_Word = () => {
    if (parseInt(id) === parseInt(loginUserId)) {
      return 'My Likes';
    } else {
      // 이 id에 해당하는 사람의 이름으로 수정해야 함
      return `${id}'s Likes`;
    }
  };

  const [followingList, setFollowingList] = useState([]);
  const [followingIdList, setFollowingIdList] = useState([]);
  const getfollowingList = async () => {
    const tempList = [];
    const tempIdList = [];
    const response = await axios.get(`api/users/${id}`);
    const likedId = response.data.followingUsers;
    for (const ID of likedId) {
      const userInfo = await axios.get(`api/users/${ID}`);
      tempList.push(userInfo.data);
      tempIdList.push(ID);
    }
    setFollowingIdList(tempIdList);
    setFollowingList(tempList);
  };

  const [followerList, setFollowerList] = useState([]);
  const getfollowerList = async () => {
    const tempList = [];
    const response = await axios.get(`api/users/${id}`);
    const likedId = response.data.followedUsers;
    for (const ID of likedId) {
      const userInfo = await axios.get(`api/users/${ID}`);
      tempList.push(userInfo.data);
    }
    setFollowerList(tempList);
  };

  useEffect(() => {
    getfollowingList();
    getfollowerList();
  }, [loginUser]);

  return (
    <div>
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
            <ProfileList
              userList={followingList}
              followingIdList={followingIdList}
            />
          </TabPanel>
          <TabPanel p="0">
            <ProfileList
              userList={followerList}
              followingIdList={followingIdList}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Likes;
