// 로그인한 나에 대한 정보는 App.js에서 보관

import axios from 'axios';
import jwt_decode from 'jwt-decode';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyProfileContainer from './../components/MyProfileContainer';

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

function removeCookie(cookie_name, value, days) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() - days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  var cookie_value =
    escape(value) +
    (days == null ? '' : '; path=/' + '; expires=' + exdate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
}

const MyPage = () => {
  const token = getCookie('token');
  const LoginUserId = jwt_decode(token).sub;
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({});
  const getLoginUser = () => {
    axios({
      url: `https://i8a404.p.ssafy.io/api/users/${LoginUserId}`,
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
    })
      .then(res => {
        setLoginUser(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getLoginUser();
  }, []);

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
      url: 'https://i8a404.p.ssafy.io/api/users/',
      params: {
        id: parseInt(LoginUserId),
      },
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
    }).then(() => {
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
      url: 'https://i8a404.p.ssafy.io/api/users/detail',
      method: 'patch',
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
      data: {
        id: parseInt(LoginUserId),
        detail: detailInfo,
      },
    })
      .then(res => {
        getLoginUser();
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
    <Box>
      <Box ref={editareaRef} height="revert">
        {/* 뒤로가기 */}
        <Box alignItems="center" display="flex" w="100%" bg="gray.100">
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
            size="lg"
            color="black"
            icon={<FiArrowLeft />}
          />
          <Text as="b">My Page</Text>
        </Box>

        {/* 컨테이너, 상세정보 */}
        <Box
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
          {/* 컨테이너 */}
          {Object.keys(loginUser).length !== 0 ? (
            <MyProfileContainer {...loginUser} />
          ) : (
            <></>
          )}

          {/* 상세정보 */}
          <Box
            mt={{
              base: '35px',
              lg: 'md',
            }}
          >
            <Flex
              flexDirection="column"
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
                {Object.keys(loginUser).length !== 0 ? (
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
                ) : (
                  <></>
                )}
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* 옵션버튼 */}
        <Box display="inline-block" position="sticky" left="94%" bottom="5%">
          <Menu isLazy lazyBehavior="keepMounted">
            <MenuButton
              fontSize="lg"
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="2px"
              backgroundColor="#B99B6B"
              borderColor="#4E6C50"
              _hover={{ bg: '#4E6C500' }}
              _expanded={{ bg: '#4E6C50' }}
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
              <MenuItem
                onClick={() => {
                  removeCookie('LoginUserId', '', -1);
                  removeCookie('token', '', -1);
                  navigate('/', { replace: true });
                }}
              >
                로그아웃
              </MenuItem>
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
                      removeCookie('LoginUserId', '', -1);
                      removeCookie('token', '', -1);
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
    </Box>
  );
};

export default MyPage;
