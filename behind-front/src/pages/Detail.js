// params로 받은 Id로 유저 정보 불러와서 렌더링
import { Box, Text, IconButton, Flex, Image, chakra } from '@chakra-ui/react';

import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { UsersStateContext } from '../App';
import axios from 'axios';

// 더미 유저 정보

const Detail = () => {
  const { loginUser } = useContext(UsersStateContext);
  const [detailUser, setDetailUser] = useState({});
  const { id } = useParams();

  // 실제로는 params에 해당하는 회원 정보를 직접 요청하겠지만
  // 지금은 전체회원정보에서 params id에 해당하는 회원을 필터링했음
  const getDetailUser = async () => {
    await axios.get(`http://localhost:3001/users/${id}`).then(res => {
      const user = res.data;
      setDetailUser(user);
    });
  };

  useEffect(() => {
    getDetailUser();
  }, [id]);

  const navigate = useNavigate();
  const goDetail = () => {
    return navigate(`/detail/${detailUser.id}`);
  };

  // 나의 디테일 페이지를 url로 접근할 때 mypage로 보내기
  if (parseInt(loginUser.id) === parseInt(id)) {
    return navigate('/mypage', { replace: true });
  }

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
        <Text as="b">{`${detailUser.id}번 회원's page`}</Text>
      </Box>

      <Flex
        bg="#edf3f8"
        _dark={{ bg: '#3e3e3e' }}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
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
        <Text>{`${detailUser.detail}`}</Text>
      </Flex>
    </div>
  );
};

export default Detail;
