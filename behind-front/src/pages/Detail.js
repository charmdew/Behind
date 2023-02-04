// params로 받은 Id로 유저 정보 불러와서 렌더링
import {
  Box,
  Text,
  IconButton,
  Flex,
  Editable,
  EditablePreview,
} from '@chakra-ui/react';

import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { UsersStateContext } from '../App';
import axios from 'axios';

import ProfileContainer from './../components/ProfileContainer';

// 더미 유저 정보

const Detail = () => {
  const { loginUser } = useContext(UsersStateContext);
  const [detailUser, setDetailUser] = useState({});
  const { id } = useParams();

  // 실제로는 params에 해당하는 회원 정보를 직접 요청하겠지만
  // 지금은 전체회원정보에서 params id에 해당하는 회원을 필터링했음
  const getDetailUser = async () => {
    await axios.get(`api/users/${id}`).then(res => {
      const user = res.data;
      setDetailUser(user);
    });
  };

  useEffect(() => {
    getDetailUser();
  }, [id]);

  const navigate = useNavigate();

  // 나의 디테일 페이지를 url로 접근할 때 mypage로 보내기
  if (parseInt(loginUser.id) === parseInt(id)) {
    return navigate('/mypage', { replace: true });
  }

  if (Object.keys(detailUser).length !== 0) {
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
        <ProfileContainer {...detailUser} />
        <Flex
          bg="#edf3f8"
          _dark={{ bg: '#3e3e3e' }}
          w="full"
          alignItems="center"
          justifyContent="center"
          pb={50}
        >
          <Box>
            <Box>
              <Flex
                flexDirection="column"
                bg="#edf3f8"
                _dark={{ bg: '#3e3e3e' }}
                w="full"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  w="md"
                  mx="auto"
                  bg="white"
                  _dark={{ bg: 'gray.800' }}
                  shadow="lg"
                  rounded="lg"
                  overflow="hidden"
                  p="7"
                >
                  <Editable
                    lineHeight="150%"
                    letterSpacing=".1rem"
                    textAlign="start"
                    defaultValue={detailUser.detail}
                    fontSize="lg"
                    isPreviewFocusable={false}
                  >
                    <Box display="flex" mb="2" pr="1" justifyContent="start">
                      <Box ml="5" pb="2" fontSize="2xl" fontStyle="italic">
                        <Text pl="3" pr="3" borderBottom="2px solid">
                          More Info
                        </Text>
                      </Box>
                    </Box>

                    <EditablePreview />
                  </Editable>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </div>
    );
  }
};
export default Detail;
