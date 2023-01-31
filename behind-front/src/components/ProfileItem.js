import React from 'react';
import { Box, Flex, Image, chakra } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UsersStateContext } from '../App';
// 인자에 사용하고 싶은 유저 property를 가져와서 사용!
const ProfileItem = it => {
  const navigate = useNavigate();
  const id = it.id;
  const { loginUser } = useContext(UsersStateContext);
  const loginUserId = loginUser.id;

  // 내 프로필 클릭하면 mypage로 보내는 기능
  const goDetail = () => {
    if (parseInt(loginUserId) === parseInt(id)) {
      return navigate('/mypage');
    } else {
      return navigate(`/detail/${id}`);
    }
  };

  return (
    <div>
      <Flex
        bg="#edf3f8"
        _dark={{ bg: '#3e3e3e' }}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        {id}
        <Box
          w="sm"
          mx="auto"
          bg="white"
          _dark={{ bg: 'gray.800' }}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
        >
          {/* userId를 파라미터로 하는 detail/{id} 페이지로 이동 */}
          <Image
            onClick={goDetail}
            w="full"
            //h={1000}
            fit="cover"
            objectPosition="center"
            // 프로필 카드 이미지 자리
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            alt="avatar"
          />

          {/* 선호 포지션 */}
          <Box py={4} px={6}>
            <Flex
              alignItems="center"
              mt={4}
              color="gray.700"
              _dark={{ color: 'gray.200' }}
            >
              <chakra.h1 px={2} fontSize="sm">
                선호 포지션
              </chakra.h1>
            </Flex>
            <chakra.h1
              fontSize="lg"
              fontWeight="bold"
              color="gray.800"
              _dark={{ color: 'white' }}
            >
              Frontend, Backend
            </chakra.h1>

            {/* 선호 트랙 */}
            <Flex
              alignItems="center"
              mt={4}
              color="gray.700"
              _dark={{ color: 'gray.200' }}
            >
              <chakra.h1 px={2} fontSize="sm">
                선호 트랙
              </chakra.h1>
            </Flex>
            <chakra.h1
              fontSize="lg"
              fontWeight="bold"
              color="gray.800"
              _dark={{ color: 'white' }}
            >
              AI / 블록체인
            </chakra.h1>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default ProfileItem;
