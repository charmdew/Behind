import { SimpleGrid, GridItem } from '@chakra-ui/react';

import LikesProfileContainer from './LikesProfileContainer';

// home과 like에서 전달한 정보를 인자로 받아서 사용
const ProfileList = ({ userList }) => {
  return (
    <SimpleGrid bg="white" minChildWidth="500px" spacing="40px">
      {userList.map(it => (
        <GridItem>
          <LikesProfileContainer key={parseInt(it.id)} {...it} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

ProfileList.defualtProps = {
  userList: {},
};

export default ProfileList;
