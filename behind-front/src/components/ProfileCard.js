import { Image, Box, Icon, Text } from '@chakra-ui/react';
import { MdEmail, MdSmartphone } from 'react-icons/md';

const ProfileCard = () => {
  // 포토 카드 실물 사이즈 : ( 54*86 )mm
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        border="0.5px solid"
        borderColor="blackAlpha.300"
        borderRadius="2xl"
        w={324}
        h={516}
        overflow="hidden"
      >
        <Image
          w="full"
          h={400}
          fit="cover"
          objectPosition="center"
          // 프로필 카드 이미지 자리
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />
        <Box pb={2} pl={4} display="flex" flexDirection="column" flex="1">
          <Box display="flex" flexGrow="3">
            <Box
              fontSize={25}
              fontWeight="bold"
              pt={1}
              mr={3}
              display="flex"
              alignItems="center"
            >
              유정훈
            </Box>
            <Box
              pt={2}
              color="blackAlpha.600"
              display="flex"
              alignItems="center"
            >
              #Front #Back #Embedded
            </Box>
          </Box>

          <Box
            display="flex"
            pl={2}
            fontSize={14}
            flexGrow="1"
            alignContent="center"
          >
            <Box>
              <Icon as={MdEmail} />
            </Box>
            <Text>choanury@naver.com</Text>
          </Box>
          <Box
            display="flex"
            pl={2}
            fontSize={14}
            flexGrow="1"
            alignContent="center"
          >
            <Icon as={MdSmartphone} />
            <Text>01071242201</Text>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ProfileCard;
