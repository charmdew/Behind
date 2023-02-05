import axios from 'axios';

import React, { useState, useEffect, useMemo } from 'react';

import ProfileList from '../components/ProfileList';
import PositionRadio from '../components/PositionRadio';
import TrackRadio from '../components/TrackRadio';

import { Box } from '@chakra-ui/react';

export const FilteredUsersDispatchContext = React.createContext();

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('api/users').then(response => {
      setUsers(response.data);
    });
  }, []);

  const [selectedPosition, setSelectedPosition] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);

  useEffect(() => {
    console.log(selectedPosition);
    console.log(selectedTrack);
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
              mt="10"
              mb="10"
              display="flex"
              flexDirection="column"
              alignItems="center"
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
  }
};

export default Home;
