import { SimpleGrid, GridItem } from '@chakra-ui/react';

import ProfileContainer from './ProfileContainer';

// home과 like에서 전달한 정보를 인자로 받아서 사용
const ProfileList = ({ userList, followingIdList }) => {
  console.log(followingIdList);
  return (
    <SimpleGrid bg="white" minChildWidth="500px" spacing="40px">
      {userList.map(it => (
        <GridItem>
          <ProfileContainer
            key={parseInt(it.id)}
            {...it}
            followingIdList={followingIdList}
          />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

ProfileList.defualtProps = {
  userList: {},
  followingIdList: [],
};

export default ProfileList;
