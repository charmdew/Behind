// 1. 회원 가입 시 회원 정보 입력
// 2. 회원 정보 수정

// 이름은 수정 불가
// 이메일, 전화번호 수정 기능 추가
// 선호 포지션, 선호 트랙은 체크박스를 좀더 공부한 뒤에
// 태그는 리스트로 저장되는데 이거 어떻게 추가를 할지 상의

import { useContext, useEffect, useState, useMemo } from 'react';
import { UsersStateContext, UsersDispatchContext } from '../App';
import jwt_decode from 'jwt-decode';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  SimpleGrid,
  GridItem,
  chakra,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Switch,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Checkbox,
  IconButton,
  Box,
  Text,
} from '@chakra-ui/react';

import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

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

const UserInfo = ({ loginUser }) => {
  const token = getCookie('token');
  const LoginUserId = jwt_decode(token).sub;
  const isTemp = jwt_decode(token).role;
  // 로그인 상태 ? 회원정보수정 : 회원정보입력
  const headWord = () => (isTemp === 'USER' ? '회원정보수정' : '회원정보입력');
  const navigate = useNavigate();
  const { refreshLoginUserInfo } = useContext(UsersDispatchContext);

  const [editedUser, setEditedUser] = useState(loginUser);
  const [name, setName] = useState(loginUser.name);
  const [email, setEmail] = useState(loginUser.email);
  const [phoneNum, setPhoneNum] = useState(loginUser.phoneNum);
  const [showPhoneNum, setShowPhoneNum] = useState(loginUser.showPhoneNum);
  const [position, setPosition] = useState(loginUser.position);
  const [track, setTrack] = useState(loginUser.track);
  const [tag, setTag] = useState(loginUser.tag);

  // name 수정
  useEffect(() => {
    setEditedUser({ ...editedUser, name: name });
  }, [name]);

  const nameHandleChange = e => {
    setName(e.target.value);
  };
  // email 수정
  useEffect(() => {
    setEditedUser({ ...editedUser, email: email });
  }, [email]);

  const emailHandleChange = e => {
    setEmail(e.target.value);
  };

  // 전화번호 수정
  useEffect(() => {
    setEditedUser({ ...editedUser, phoneNum: phoneNum });
  }, [phoneNum]);
  const phoneNumHandleChange = e => {
    setPhoneNum(e.target.value);
  };

  // 전화번호 공개 여부 수정
  useEffect(() => {
    setEditedUser({ ...editedUser, showPhoneNum: showPhoneNum });
  }, [showPhoneNum]);
  const showPhoneNumHandleChange = e => {
    setShowPhoneNum(e.target.checked);
  };

  // 선호포지션 수정
  useEffect(() => {
    setEditedUser({ ...editedUser, position: position });
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
  const positionEmbeddedHandleChange = e => {
    setPosition(prePosition => {
      return { ...prePosition, embedded: e.target.checked };
    });
  };

  // 선호트랙 수정
  useEffect(() => {
    setEditedUser({ ...editedUser, track: track });
  }, [track]);

  const majorHandleChange = e => {
    setTrack(preTrack => {
      return { ...preTrack, major: e.target.checked };
    });
  };
  const nonMajorHandleChange = e => {
    setTrack(preTrack => {
      return { ...preTrack, nonMajor: e.target.checked };
    });
  };
  // const trackIotHandleChange = e => {
  //   setTrack(preTrack => {
  //     return { ...preTrack, iot: e.target.checked };
  //   });
  // };
  // const trackBigdataHandleChange = e => {
  //   setTrack(preTrack => {
  //     return { ...preTrack, bigdata: e.target.checked };
  //   });
  // };
  // const trackmetaverseHandleChange = e => {
  //   setTrack(preTrack => {
  //     return { ...preTrack, metaverse: e.target.checked };
  //   });
  // };

  // tag 수정
  useEffect(() => {
    setEditedUser({ ...editedUser, tag: tag });
  }, [tag]);

  const tagDelete = (word, e) => {
    const newTagList = tag.filter(it => it !== word);
    setTag(newTagList);
  };

  const [tagWord, setTagWord] = useState('');
  const tagInputHandleChange = e => {
    setTagWord(e.target.value);
  };

  const tagAdd = () => {
    const virtualNameTag = document.querySelector('#virtual-name-tag');
    const virtualTag = virtualNameTag.querySelector('.tag');
    const origVirtualTagInnerHTML = virtualTag.innerHTML;
    virtualTag.innerHTML += ' #' + tagWord;
    if (virtualNameTag.clientWidth > 285) {
      virtualTag.innerHTML = origVirtualTagInnerHTML;
      alert(
        '출력될 카드 너비를 초과하였습니다. 더 짧은 단어를 입력해 주시거나 기존 단어를 수정해 주세요!'
      );
      setTagWord('');
    } else if (tagWord.length !== 0) {
      const newTagList = [...tag, '#' + tagWord];
      setTagWord('');
      setTag(newTagList);
    } else {
      alert('입력하신 태그가 없습니다');
    }
  };

  // 회원 정보 수정 완료
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
    if (positionCnt > 2) {
      alert('선호 포지션은 최대 2개 선택 가능합니다');
    } else if (trackCnt > 1 || trackCnt === 0) {
      alert('전공과 비전공 중 하나를 선택해주세요');
    } else if (phoneNum.length === 0) {
      alert('전화번호를 입력해 주세요');
    } else {
      // 서버에 전달할 유저 데이터
      const requestUserData = {
        name: editedUser.name,
        email: editedUser.email,
        position: editedUser.position,
        tag: editedUser.tag,
        track: editedUser.track,
        phoneNum: editedUser.phoneNum,
        showPhoneNum: editedUser.showPhoneNum,
        id: parseInt(LoginUserId),
      };

      axios({
        url: 'https://i8a404.p.ssafy.io/api/signUp',
        method: 'patch',
        headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
        data: {
          ...requestUserData,
        },
      })
        .then(() => {
          navigate('/mypage', { replace: true });
          refreshLoginUserInfo(LoginUserId);
        })
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
          color="black"
          icon={<FiArrowLeft />}
        />
        <Text as="b">{`${headWord()}`}</Text>
        {/* <Text as="b">회원정보수정</Text> */}
      </Box>

      {/* <Box display="flex" justifyContent="center" bg="#4E6C50" p="10" pb="20"> */}
      <Box
        display="flex"
        justifyContent="center"
        // bg="#4E6C50"
        // bg={{
        //   base: '#4E6C50',
        //   lg: 'white',
        // }}
        p={{
          base: '2',
          lg: '10',
        }}
      >
        <SimpleGrid
          display={{
            base: 'initial',
            md: 'grid',
          }}
          columns={{
            md: 1,
          }}
          spacing={{
            md: 6,
          }}
          border="solid 2px"
          borderColor="#4E6C50"
        >
          <GridItem
            colSpan={{
              md: 2,
            }}
          >
            <chakra.form
              shadow="base"
              rounded={[null, 'md']}
              overflow={{
                sm: 'hidden',
              }}
            >
              <Stack
                w={{
                  base: '95vw',
                  lg: '50vw',
                }}
                px={{
                  base: '4%',
                  lg: '2%',
                }}
                py={{
                  base: '3%',
                  lg: '5',
                }}
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
                      defaultValue={loginUser.name}
                      type="text"
                      name="name"
                      id="name"
                      mt={{
                        base: '0',
                        lg: '1',
                      }}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={nameHandleChange}
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
                      defaultValue={loginUser.email}
                      type="text"
                      name="email_address"
                      id="email_address"
                      mt={{
                        base: '0',
                        lg: '1',
                      }}
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
                      defaultValue={loginUser.phoneNum}
                      type="text"
                      name="phone"
                      id="phone"
                      mt={{
                        base: '0',
                        lg: '1',
                      }}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={phoneNumHandleChange}
                    />
                    <FormControl pt="1" display="flex" alignItems="center">
                      <FormLabel htmlFor="email-alerts" mb="0">
                        전화번호 비공개
                      </FormLabel>
                      <Switch
                        id="email-alerts"
                        defaultChecked={loginUser.showPhoneNum}
                        onChange={showPhoneNumHandleChange}
                      />
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            ml="10px"
                            size={{
                              base: 'xs',
                              lg: 'xs',
                            }}
                          >
                            Guide
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent width="240px">
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>전화번호 비공개</PopoverHeader>
                          <PopoverBody>
                            출력될 카드에는 전화번호가 기재되지만 Web에 게시되는
                            카드에는 전화번호가 노출되지 않습니다.
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
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
                      선호 포지션 (2개까지 선택 가능)
                    </FormLabel>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={loginUser.position.frontend}
                        onChange={positionFrontendHandleChange}
                      >
                        FrontEnd
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={loginUser.position.backend}
                        onChange={positionBackendHandleChange}
                      >
                        BackEnd
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={loginUser.position.embedded}
                        onChange={positionEmbeddedHandleChange}
                      >
                        Embedded
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
                      전공 / 비전공
                    </FormLabel>
                    <Stack spacing={[1, 2]} direction={['column', 'row']}>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={loginUser.track.major}
                        onChange={majorHandleChange}
                      >
                        전공
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={loginUser.track.nonMajor}
                        onChange={nonMajorHandleChange}
                      >
                        비전공
                      </Checkbox>
                      {/* <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={loginUser.track.iot}
                        onChange={trackIotHandleChange}
                      >
                        IoT
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={loginUser.track.bigdata}
                        onChange={trackBigdataHandleChange}
                      >
                        BigData
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={loginUser.track.metaverse}
                        onChange={trackmetaverseHandleChange}
                      >
                        metaverse
                      </Checkbox> */}
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
                      카드에 기재될 태그를 입력해 주세요
                    </FormLabel>
                    <Stack spacing={[1, 5]} direction="row">
                      <Input
                        size={{
                          base: 'sm',
                          sm: 'md',
                        }}
                        placeholder="ex) FrontEnd"
                        value={tagWord}
                        onChange={tagInputHandleChange}
                      />
                      <Button
                        size={{
                          base: 'sm',
                          sm: 'md',
                        }}
                        onClick={tagAdd}
                      >
                        Add
                      </Button>
                    </Stack>

                    <HStack spacing={4} pt="2">
                      {tag.map(word => (
                        <Tag
                          py="3px"
                          size={{
                            base: 'sm',
                            sm: 'md',
                          }}
                          key={word}
                          borderRadius="full"
                          variant="solid"
                          colorScheme="green"
                        >
                          <TagLabel>{word}</TagLabel>
                          <TagCloseButton
                            onClick={e => {
                              tagDelete(word, e);
                            }}
                          />
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
                py={{
                  base: 2,
                  sm: 3,
                }}
                bg="gray.50"
                _dark={{
                  bg: '#121212',
                }}
                textAlign="right"
              >
                <Button
                  size={{
                    base: 'sm',
                    lg: 'md',
                  }}
                  type="submit"
                  _focus={{
                    shadow: '',
                  }}
                  fontWeight="bold"
                  onClick={userSave}
                  bg="gray.200"
                >
                  Save
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box
        id="virtual-name-tag"
        display="inline-flex"
        visibility="hidden"
        position="absolute"
        bottom={0}
      >
        <Box
          className="name"
          fontSize={25}
          fontWeight="extrabold"
          pt={1}
          mr={3}
          display="flex"
          alignItems="center"
        >
          {editedUser.name}
        </Box>
        <Box
          className="tag"
          pt={2}
          color="blackAlpha.600"
          display="flex"
          alignItems="center"
        >
          {editedUser.tag.join(' ')}
        </Box>
      </Box>
    </div>
  );
};

export default UserInfo;
