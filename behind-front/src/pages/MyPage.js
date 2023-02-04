// 로그인한 나에 대한 정보는 App.js에서 보관

import axios from 'axios';

import React, { useContext, useState, useRef, useEffect } from 'react';
import { UsersStateContext, UsersDispatchContext } from '../App';
import { useNavigate } from 'react-router-dom';
import ProfileContainer from './../components/ProfileContainer';

import {
  Editable,
  EditableTextarea,
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
  Flex,
  Textarea,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { FiArrowLeft } from 'react-icons/fi';
import { MdSettings } from 'react-icons/md';

const MyPage = () => {
  const { loginUser } = useContext(UsersStateContext);
  const navigate = useNavigate();
  const { refreshLoginUserInfo } = useContext(UsersDispatchContext);

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
      url: `api/users/${loginUser.id}`,
    }).then(response => {
      alert('회원탈퇴가 완료되었습니다.');
      navigate('/', { replace: true });
    });
  };

  // 상세 정보 수정
  const [detailInfo, setDetailInfo] = useState(loginUser.detail);
  const detailContentHandleChange = e => {
    setDetailInfo(e);
  };
  const userSave = () => {
    axios({
      url: 'api/users/detail',
      method: 'patch',
      headers: { 'Content-Type': 'application/json' },
      data: {
        id: parseInt(loginUser.id),
        detail: detailInfo,
      },
    })
      .then(() => {
        refreshLoginUserInfo();
      })
      .catch(function (error) {
        // 오류발생시 실행
        console.log(error);
      });
  };

  // 수정 모드 전환 플래그
  const editareaRef = useRef();

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    useEffect(() => {
      if (isEditing) {
        scrolltoBottom();
      }
    }, [isEditing]);

    const scrolltoBottom = () =>
      editareaRef.current.scrollIntoView({
        block: 'end',
      });

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <Box onClick={userSave}>
          <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        </Box>
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          onClick={() => scrolltoBottom}
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <div>
      <Box ref={editareaRef} height="revert" backgroundColor="gray.100">
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
          <ProfileContainer {...loginUser} />

          {/* 상세정보 */}
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
                  defaultValue={loginUser.detail}
                  fontSize="lg"
                  isPreviewFocusable={false}
                  onChange={detailContentHandleChange}
                >
                  <Box
                    display="flex"
                    mb="2"
                    pr="1"
                    justifyContent="space-between"
                  >
                    <Box ml="5" pb="2" fontSize="2xl" fontStyle="italic">
                      <Text pl="3" pr="3" borderBottom="2px solid">
                        More Info
                      </Text>
                    </Box>
                    <Box>
                      <EditableControls />
                    </Box>
                  </Box>

                  <EditablePreview />

                  <Textarea
                    fontSize="xl"
                    as={EditableTextarea}
                    rows="10"
                    lineHeight="150%"
                    letterSpacing=".1rem"
                  />
                </Editable>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* 옵션버튼 */}
        <Box display="inline-block" position="sticky" left="94%" bottom="14%">
          <Menu isLazy lazyBehavior="keepMounted">
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="3px"
              backgroundColor="white"
              borderColor="blue.300"
              _hover={{ bg: 'blue.100' }}
              _expanded={{ bg: 'blue.300' }}
              _focus={{ boxShadow: 'outline' }}
            >
              <MdSettings />
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
