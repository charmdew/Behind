import { SimpleGrid, GridItem } from '@chakra-ui/react';

import ProfileContainer from './ProfileContainer';

// home과 like에서 전달한 정보를 인자로 받아서 사용
const ProfileList = ({ userList }) => {
  return (
    <SimpleGrid bg="white" minChildWidth="500px" spacing="40px">
      {userList.map(it =>
        it.id ? (
          <GridItem key={it.id.toString()}>
            <ProfileContainer {...it} />
          </GridItem>
        ) : (
          <></>
        )
      )}
    </SimpleGrid>
  );
};

ProfileList.defualtProps = {
  userList: [],
};

export default ProfileList;
