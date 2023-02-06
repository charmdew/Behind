import axios from 'axios';

import React, { useState, useEffect, useMemo, useContext } from 'react';

import ProfileList from '../components/ProfileList';
import PositionRadio from '../components/PositionRadio';
import TrackRadio from '../components/TrackRadio';

import { Box } from '@chakra-ui/react';
import { UsersStateContext } from '../App';
export const FilteredUsersDispatchContext = React.createContext();

const Home = () => {
  const { loginUser } = useContext(UsersStateContext);
  const [followingIdList, setFollowingIdList] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('api/users').then(response => {
      setUsers(response.data);
    });
    setFollowingIdList(loginUser.followingUsers);
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

  if (users.length !== 0) {
    return (
      <div>
        <FilteredUsersDispatchContext.Provider value={memoizedFilterDispatches}>
          <Box>
            {/* 포지션,트랙 라디오 */}
            <Box
              pt="10"
              pb="10"
              mb="10"
              display="flex"
              flexDirection="column"
              alignItems="center"
              bg="white"
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
