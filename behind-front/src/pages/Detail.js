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

function getCookie(cookie_name) {
  var x, y;
  var val = document.cookie.split(';');

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x == cookie_name) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}

const Detail = () => {
  const LoginUserId = getCookie('LoginUserId');
  const { loginUser } = useContext(UsersStateContext);
  const [detailUser, setDetailUser] = useState({});
  const { id } = useParams();

  const getDetailUser = () => {
    axios.get(`api/users/${id}`).then(res => {
      const user = res.data;
      setDetailUser(user);
    });
    axios.get(`api/users/${LoginUserId}`).then(res => {
      const loginUserInfo = res.data;
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
          <Text as="b">{`${detailUser.name}'s page`}</Text>
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
