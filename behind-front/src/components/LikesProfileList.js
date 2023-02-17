import { SimpleGrid, GridItem } from '@chakra-ui/react';

import LikesProfileContainer from './LikesProfileContainer';

// home과 like에서 전달한 정보를 인자로 받아서 사용
const ProfileList = ({ userList }) => {
  return (
    <SimpleGrid
      bg="white"
      minChildWidth={{
        base: '50vw',
        lg: '500px',
      }}
      spacing={{
        base: '20px',
        lg: '40px',
      }}
      mx="4px"
    >
      {userList.map(it => (
        <GridItem key={it.id.toString()}>
          <LikesProfileContainer {...it} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

ProfileList.defualtProps = {
  userList: {},
};

export default ProfileList;
