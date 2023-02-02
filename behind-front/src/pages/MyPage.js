// 로그인한 나에 대한 정보는 App.js에서 보관

import axios from 'axios';

import React, { useContext, useState } from 'react';
import { UsersStateContext } from '../App';
import { useNavigate } from 'react-router-dom';
import ProfileContainer from './../components/ProfileContainer';

import {
  Editable,
  EditableInput,
  EditableTextarea,
  Input,
  useEditableControls,
  EditablePreview,
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
  ButtonGroup,
  useColorModeValue,
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FiArrowLeft } from 'react-icons/fi';

const MyPage = () => {
  const { loginUser } = useContext(UsersStateContext);
  const navigate = useNavigate();

  // 회원탈퇴 모달
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancleRef = React.useRef();
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

  // 상세 정보 수정

  // 수정 모드 전환 플래그
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <div>
      <Box backgroundColor="gray.100">
        {/* 뒤로가기 */}
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

        {/* 컨테이너, 상세정보 */}
        <Box>
          {/* 컨테이너 */}
          <Box>
            <ProfileContainer {...loginUser} />
            {/* <Box>{loginUser.detail}</Box> */}
            <Box>
              <Editable
                textAlign="center"
                defaultValue="Rasengan ⚡️"
                fontSize="2xl"
                isPreviewFocusable={false}
              >
                <EditablePreview />
                {/* Here is the custom input */}
                <Input as={EditableInput} />
                <EditableControls />
              </Editable>
            </Box>
          </Box>
          {/* 상세정보 */}
        </Box>

        {/* 옵션버튼 */}
        <Box>
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
            leastDestructiveRef={cancleRef}
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
                  <Button ref={cancleRef} onClick={onClose}>
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
        </Box>
      </Box>
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
