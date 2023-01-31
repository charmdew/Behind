// 1. 회원 가입 시 회원 정보 입력
// 2. 회원 정보 수정

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

import { Checkbox, CheckboxGroup } from '@chakra-ui/react';

import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const UserInfo = () => {
  // 로그인 상태 ? 회원정보수정 : 회원정보입력
  const [placeHold, setPlaceHold] = useState({});
  const { loginUser } = useContext(UsersStateContext);
  const isLogin = useMemo(() => (loginUser ? true : false));
  const headWord = () => (isLogin ? '회원정보수정' : '회원정보입력');
  const navigate = useNavigate();

  console.log(loginUser);
  // placeHold를 useState로 써보자

  useEffect(() => {
    setPlaceHold(loginUser);
  }, [loginUser]);

  const position = () => {
    return [parseInt(placeHold.position1), parseInt(placeHold.position2)];
  };

  console.log(position());

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
        <Text as="b">{`${headWord()}`}</Text>
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
              method="POST"
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
                      value={placeHold.name}
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
                      value={placeHold.email}
                      type="text"
                      name="email_address"
                      id="email_address"
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
                      전화번호
                    </FormLabel>
                    <Input
                      value={placeHold.phoneNum}
                      type="text"
                      name="phone"
                      id="phone"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    />
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="email-alerts" mb="0">
                        전화번호 비공개
                      </FormLabel>
                      <Switch id="email-alerts" />
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
                        defaultChecked={position().includes(1)}
                      >
                        FrontEnd
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={position().includes(2)}
                      >
                        BackEnd
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        colorScheme="orange"
                        defaultChecked={position().includes(3)}
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
                      <Checkbox size="lg" colorScheme="orange">
                        AI
                      </Checkbox>
                      <Checkbox size="lg" colorScheme="orange">
                        BlockChain
                      </Checkbox>
                      <Checkbox size="lg" colorScheme="orange">
                        IoT
                      </Checkbox>
                      <Checkbox size="lg" colorScheme="orange">
                        BigData
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
                      태그를 입력해 주세요
                    </FormLabel>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                      <Input value={placeHold.tag} />
                    </Stack>
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
