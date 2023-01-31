// 1. 회원 가입 시 회원 정보 입력
// 2. 회원 정보 수정

// 이름은 수정 불가
// 이메일, 전화번호 수정 기능 추가
// 선호 포지션, 선호 트랙은 체크박스를 좀더 공부한 뒤에
// 태그는 리스트로 저장되는데 이거 어떻게 추가를 할지 상의

import { useContext, useEffect, useState, useMemo } from 'react';
import { UsersStateContext } from '../App';

import { IconButton, Box, Text } from '@chakra-ui/react';
import {
  SimpleGrid,
  GridItem,
  Heading,
  chakra,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Switch,
} from '@chakra-ui/react';

import {
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react';

import { Checkbox, CheckboxGroup } from '@chakra-ui/react';

import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import MyPage from '../pages/MyPage';

const UserInfo = () => {
  const { loginUser } = useContext(UsersStateContext);
  // 로그인 상태 ? 회원정보수정 : 회원정보입력
  const isLogin = useMemo(() => (loginUser ? true : false));
  const headWord = () => (isLogin ? '회원정보수정' : '회원정보입력');
  const navigate = useNavigate();

  const editedUser = loginUser;
  const [email, setEmail] = useState(loginUser.email);
  const [phoneNum, setPhoneNum] = useState(loginUser.phoneNum);
  const [phoneBoolean, setPhoneBoolean] = useState(loginUser.phoneBoolean);
  const [position, setPosition] = useState(loginUser.position);
  const [track, setTrack] = useState(loginUser.track);
  const [tag, setTag] = useState(loginUser.tag);

  // email 수정
  const emailHandleChange = e => {
    setEmail(e.target.value);
    editedUser.email = email;
    editedUser.email = e.target.value;
  };
  const phoneNumHandleChange = e => {
    setPhoneNum(e.target.value);
    editedUser.phoneNum = phoneNum;
    editedUser.phoneNum = e.target.value;
  };

  // 전화번호 공개 여부 수정
  useEffect(() => {
    editedUser.phoneBoolean = phoneBoolean;
  }, [phoneBoolean]);
  const phoneBooleanHandleChange = e => {
    setPhoneBoolean(e.target.value);
  };

  // 선호포지션 수정
  useEffect(() => {
    editedUser.position = position;
  }, [position]);

  const positionFrontendHandleChange = e => {
    setPosition(prePosition => {
      return { ...prePosition, frontend: e.target.checked };
    });
  };
  const positionBackendHandleChange = e => {
    setPosition(prePosition => {
      return { ...prePosition, backend: e.target.checked };
    });
  };
  const positionEmbededHandleChange = e => {
    setPosition(prePosition => {
      return { ...prePosition, embeded: e.target.checked };
    });
  };

  // 선호트랙 수정
  useEffect(() => {
    editedUser.track = track;
  }, [track]);

  const trackAiHandleChange = e => {
    setTrack(preTrack => {
      return { ...preTrack, ai: e.target.checked };
    });
  };
  const trackBlockchainHandleChange = e => {
    setTrack(preTrack => {
      return { ...preTrack, blockchain: e.target.checked };
    });
  };
  const trackIotHandleChange = e => {
    setTrack(preTrack => {
      return { ...preTrack, iot: e.target.checked };
    });
  };
  const trackBigdataHandleChange = e => {
    setTrack(preTrack => {
      return { ...preTrack, bigdata: e.target.checked };
    });
  };

  // tag 수정
  const tagDelete = e => {
    console.log(e);
  };

  const userSave = e => {
    e.preventDefault();
    const TFposition = Object.values(editedUser.position);
    const TFtrack = Object.values(editedUser.track);

    let positionCnt = 0;
    TFposition.forEach(element => {
      if (element) {
        positionCnt += 1;
      }
    });
    let trackCnt = 0;
    TFtrack.forEach(element => {
      if (element) {
        trackCnt += 1;
      }
    });
    if (positionCnt > 2 || trackCnt > 2) {
      alert('선호 포지션과 선호 트랙은 최대 2개 선택 가능합니다');
    } else {
      axios
        .put(`http://localhost:3001/users/${loginUser.id}`, editedUser)
        .then(navigate('/mypage', { replace: true }))
        .catch(function (error) {
          // 오류발생시 실행
          console.log(error);
        });
    }
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
        {/* <Text as="b">{`${headWord()}`}</Text> */}
        <Text as="b">회원정보수정</Text>
      </Box>

      <Box mt={[10, 0]}>
        <SimpleGrid
          display={{
            base: 'initial',
            md: 'grid',
          }}
          columns={{
            md: 3,
          }}
          spacing={{
            md: 6,
          }}
        >
          <GridItem
            mt={[5, null, 0]}
            colSpan={{
              md: 2,
            }}
          >
            <chakra.form
              // method="POST"
              shadow="base"
              rounded={[null, 'md']}
              overflow={{
                sm: 'hidden',
              }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg="white"
                _dark={{
                  bg: '#141517',
                }}
                spacing={6}
              >
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="first_name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      이름
                    </FormLabel>
                    <Input
                      value={loginUser.name}
                      type="text"
                      name="name"
                      id="name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      htmlFor="email_address"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      이메일
                    </FormLabel>
                    <Input
                      value={editedUser.email}
                      type="text"
                      name="email_address"
                      id="email_address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={emailHandleChange}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      htmlFor="email_address"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      전화번호
                    </FormLabel>
                    <Input
                      value={editedUser.phoneNum}
                      type="text"
                      name="phone"
                      id="phone"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={phoneNumHandleChange}
                    />
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="email-alerts" mb="0">
                        전화번호 비공개
                      </FormLabel>
                      <Switch
                        id="email-alerts"
                        defaultChecked={editedUser.phoneBoolean}
                        onChange={phoneBooleanHandleChange}
                      />
                    </FormControl>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      htmlFor="email_address"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      선호 포지션 (2개 선택해 주세요)
                    </FormLabel>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={editedUser.position.frontend}
                        onChange={positionFrontendHandleChange}
                      >
                        FrontEnd
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={editedUser.position.backend}
                        onChange={positionBackendHandleChange}
                      >
                        BackEnd
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={editedUser.position.embeded}
                        onChange={positionEmbededHandleChange}
                      >
                        Embeded
                      </Checkbox>
                    </Stack>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      htmlFor="email_address"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      선호트랙 (2개 선택해 주세요)
                    </FormLabel>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={editedUser.track.ai}
                        onChange={trackAiHandleChange}
                      >
                        AI
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={editedUser.track.blockchain}
                        onChange={trackBlockchainHandleChange}
                      >
                        BlockChain
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={editedUser.track.iot}
                        onChange={trackIotHandleChange}
                      >
                        IoT
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={editedUser.track.bigdata}
                        onChange={trackBigdataHandleChange}
                      >
                        BigData
                      </Checkbox>
                    </Stack>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      태그를 입력해 주세요
                    </FormLabel>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                      <Input placeholder="frontEnd" />
                    </Stack>

                    <HStack spacing={4}>
                      {editedUser.tag.map(word => (
                        <Tag
                          size="lg"
                          key={word}
                          borderRadius="full"
                          variant="solid"
                          colorScheme="green"
                        >
                          <TagLabel>{word}</TagLabel>
                          <TagCloseButton onClick={tagDelete} />
                        </Tag>
                      ))}
                    </HStack>
                  </FormControl>
                </SimpleGrid>
              </Stack>
              <Box
                px={{
                  base: 4,
                  sm: 6,
                }}
                py={3}
                bg="gray.50"
                _dark={{
                  bg: '#121212',
                }}
                textAlign="right"
              >
                <Button
                  type="submit"
                  colorScheme="brand"
                  _focus={{
                    shadow: '',
                  }}
                  fontWeight="md"
                  onClick={userSave}
                >
                  Save
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default UserInfo;
