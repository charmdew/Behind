// 로그인한 나에 대한 정보는 App.js에서 보관

import axios from 'axios';

import React, { useContext } from 'react';
import { UsersStateContext } from '../App';
import { useNavigate } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { FiArrowLeft } from 'react-icons/fi';

const MyPage = () => {
  const { loginUser } = useContext(UsersStateContext);
  const navigate = useNavigate();

  // 선택한 선호 포지션 추출
  const position = () => {
    const temp = [];
    if (loginUser.position.frontend) {
      temp.push('frontend');
    }
    if (loginUser.position.backend) {
      temp.push('backend');
    }
    if (loginUser.position.embeded) {
      temp.push('embeded');
    }
    return temp;
  };

  // 선택한 선호 트랙 추출
  const track = () => {
    const temp = [];
    if (loginUser.track.ai) {
      temp.push('ai');
    }
    if (loginUser.track.bigdata) {
      temp.push('bigdata');
    }
    if (loginUser.track.iot) {
      temp.push('iot');
    }
    if (loginUser.track.blockchain) {
      temp.push('blockchain');
    }
    return temp;
  };

  // 회원탈퇴 모달
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  // 회원탈퇴 기능  // 좀더 본인을 확인할 수 있는 검증이 필요하지 않을까??

  // 추가해야 할 것
  // 토큰 삭제 및 로그인 유저 state 삭제
  // 로그인 화면으로 이동
  const userUnregister = () => {
    axios({
      method: 'delete',
      url: `http://localhost:3001/users/${loginUser.id}`,
    }).then(response => {
      alert('회원탈퇴가 완료되었습니다.');
      navigate('/', { replace: true });
    });
  };

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
        <Text as="b">My Page</Text>
      </Box>

      <Box>
        <Text>이름</Text>
        <Text>{loginUser.name}</Text>
        <Text>태그</Text>
        <Text>{`#${loginUser.tag.join(' #')}`}</Text>
        <Text>email</Text>
        <Text>{loginUser.email}</Text>
        <Text>phone</Text>
        <Text>{loginUser.phoneNum}</Text>
        <Text>선호포지션</Text>
        <Text>{position()}</Text>
        <Text>선호트랙</Text>
        <Text>{track()}</Text>
        <Text>상세</Text>
        <Text>{loginUser.detail}</Text>
      </Box>

      <Menu>
        <MenuButton
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: 'gray.400' }}
          _expanded={{ bg: 'blue.400' }}
          _focus={{ boxShadow: 'outline' }}
        >
          User Setting <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate('/useredit');
            }}
          >
            회원정보수정
          </MenuItem>
          <MenuDivider />
          <MenuItem>로그아웃</MenuItem>
          <MenuDivider />

          <MenuItem onClick={onOpen}>회원탈퇴</MenuItem>
        </MenuList>
      </Menu>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              회원탈퇴
            </AlertDialogHeader>

            <AlertDialogBody>
              <p>정말로 탈퇴하시겠습니까?</p>
              <p>탈퇴 시 저장된 회원님의 모든 정보가 삭제됩니다.</p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  userUnregister();
                  onClose();
                }}
                ml={3}
              >
                탈퇴
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default MyPage;

// {
//   "id": 1,
//   "userId": "choanury",
//   "detail": "구로구에 사는 유정훈입니다.",
//   "tag": ["Front", "JS", "React"],
//   "email": "choanury@naver.com",
//   "name": "유정훈",
//   "phoneNum": "01071242201",
//   "phoneBoolean": true,
//   "position": {
//     "frontend": true,
//     "backend": true,
//     "embeded": false
//   },
//   "track": {
//     "ai": true,
//     "iot": false,
//     "bigdata": true,
//     "blockchain": false
//   },
//   "images": "imgs",
//   "profile": "profile_img",
//   "followingUsers": [2, 3, 7],
//   "followedUsers": [4, 5, 9]
// },
