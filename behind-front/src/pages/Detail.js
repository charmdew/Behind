import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';

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

import ProfileContainer from './../components/ProfileContainer';
import { UsersStateContext } from '../App';

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
  const navigate = useNavigate();
  const token = getCookie('token');
  const LoginUserId = jwt_decode(token).sub;
  const [detailUser, setDetailUser] = useState({});
  const { id } = useParams();

  const getDetailUser = () => {
    axios({
      url: `https://i8a404.p.ssafy.io/api/users/${id}`,
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
    })
      .then(res => {
        const user = res.data;
        if (user.userId === 'deletedUser') {
          alert('탈퇴된 회원입니다.');
          navigate('/', { replace: true });
        }
        setDetailUser(user);
      })
      .catch(function (error) {
        // 오류발생시 실행
        console.log(error);
      });
  };

  useEffect(() => {
    getDetailUser();
  }, [id]);

  // 나의 디테일 페이지를 url로 접근할 때 mypage로 보내기
  if (parseInt(LoginUserId) === parseInt(id)) {
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
          // bg="#edf3f8"
          _dark={{ bg: '#3e3e3e' }}
          pt={{
            base: '5',
            lg: '50',
          }}
          px={{
            base: '1vw',
            lg: '5vw',
          }}
          alignItems="center"
          justifyContent="center"
          pb={50}
        >
          <Box
            mt={{
              base: '35px',
              lg: 'md',
            }}
          >
            <Flex
              flexDirection="column"
              // bg="#edf3f8"
              _dark={{ bg: '#3e3e3e' }}
              w="full"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                border="solid 2px"
                borderColor="#4E6C50"
                w={{
                  base: '90vw',
                  lg: 'md',
                }}
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
        </Flex>
      </div>
    );
  }
};
export default Detail;
