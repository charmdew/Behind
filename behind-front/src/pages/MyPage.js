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
  Textarea,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FiArrowLeft } from 'react-icons/fi';

const MyPage = () => {
  //삭제 요망
  const texttt =
    '2021년 3월 2일 공군 제20전투비행단(이하 20비) 소속 이예람 중사는 같은 부대 소속 상관인 장 모 중사에게 성추행을 당했다. 부대 밖 회식에 갔다가 돌아오는 차 안에서였다. 이 중사는 다음날 오전 소속 반장인 노 모 준위, 회식에 동석한 노 모 상사에게 성추행 피해 사실을 보고했다. 그러나 두 사람은 상부에 보고하는 대신 “없던 일로 해주면 안 되겠냐”며 이 중사를 회유하고 협박했다. 그날 밤 10시가 돼서야 상부 보고가 이루어졌고 20비 군사경찰대대에 신고가 접수됐다. 그러나 신고 이후 피해자 보호 조치나 사건에 대한 즉각적인 수사는 이루어지지 않았다.2차 피해를 막기 위해 가장 우선됐어야 할 가해자·피해자 분리 조치도 상당 기간 지연됐다. 군사경찰 수사는 불구속 수사로 진행됐고, 가해자인 장 중사는 사건이 벌어지고 보름이 지나서야 타 부대로 보내졌다. 그 동안 이 중사는 장 중사와 같은 부대 내에 머물러야 했다. 그 동안 장 중사는 부대 내에 피해자에 대한 허위 사실을 유포하고, 이 중사에게 “죽어야겠다는 생각이 든다”는 내용의 문자 메시지를 보내는 등 2차 가해를 자행했다. 부대 내 동료 군인들에게 탄원서를 받으러 다니기도 했다.4월 7일 20비 법무실로 사건이 송치됐으나 담당 군검사는 곧바로 수사에 나서지 않았다. 사건 송치 당시 이 중사의 심리상태 악화, 부대 내 2차 가해 정황 등을 인지하고도 관련 사안을 검토하지 않았고, 피해자 조사 일정을 무단으로 지연시켰다. 이 중사의 국선변호인을 맡은 공군본부 소속 법무관도 약 두 달 간 피해자에 대한 법률 지원을 하지 않았다. 이 중사는 5월 18일 공군 제15특수임무비행단(이하 15비)으로 전출됐다.하지만 전출된 곳에서도 이 중사에 대한 2차 가해가 계속됐다. 15비 대대장은 이 중사가 부대에 전입하기 며칠 전인 5월 14일 내부 회의에서 이 중사의 성추행 피해 사실을 유출했고, 15비 중대장도 부대 구성원들이 모인 자리에서 전입 오는 이 중사에 대해 “성 관련된 일로 추측되는 사건이 있었다”고 말했다. 이 중사가 전입 온 뒤에는 신고 의무가 없는 사항을 보고하게 하는 등 부당하게 대우했다. 이 중사는 15비로 전입된 지 4일 만인 5월 21일, 극단적 선택으로 세상을 떠났다.';

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
                  fontSize="xl"
                  isPreviewFocusable={false}
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
                  {/* Here is the custom input */}
                  {/* <textarea name="text" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'></textarea> */}

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
        <Box
          display="flex"
          justifyContent="end"
          position="sticky"
          bottom="4%"
          pr="1%"
        >
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
