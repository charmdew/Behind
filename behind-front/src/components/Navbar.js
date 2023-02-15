import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { UsersStateContext } from '../App';
import QRcode from './QRcode';
import jwt_decode from 'jwt-decode';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';

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

const NavBar = () => {
  const { loginUser } = useContext(UsersStateContext);
  const LoginUserId = loginUser.id;

  const bg = useColorModeValue('#4E6C50', 'gray.800');
  const mobileNav = useDisclosure();
  // 모달 컨트롤러
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 라우트 네비게이터
  const navigate = useNavigate();

  // Likes으로 가라
  const GoMyLikes = () => {
    const token = getCookie('token');
    if (!token) {
      alert('로그인이 필요합니다');
      return navigate('/login');
    }
    return navigate(`/likes/${LoginUserId}`);
  };
  // MyPage으로 가라
  const GoMyPage = () => {
    const token = getCookie('token');
    if (!token) {
      alert('로그인이 필요합니다');
      return navigate('/login');
    }
    return navigate('/mypage');
  };

  // 버튼 CSS
  const QRButtonOnHover = e => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#4E6C50';
  };
  const LikesButtonOnHover = e => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#4E6C50';
  };
  const MypageButtonOnHover = e => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#4E6C50';
  };
  const QRButtonOffHover = e => {
    e.target.style.backgroundColor = '#4E6C50';
    e.target.style.color = 'white';
  };
  const LikesButtonOffHover = e => {
    e.target.style.backgroundColor = '#4E6C50';
    e.target.style.color = 'white';
  };

  const MypageButtonOffHover = e => {
    e.target.style.backgroundColor = '#4E6C50';
    e.target.style.color = 'white';
  };
  const HamQRButtonOnHover = e => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#4E6C50';
  };
  const HamLikesButtonOnHover = e => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#4E6C50';
  };
  const HamMypageButtonOnHover = e => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#4E6C50';
  };
  const HamQRButtonOffHover = e => {
    e.target.style.backgroundColor = '#4E6C50';
    e.target.style.color = 'white';
  };
  const HamLikesButtonOffHover = e => {
    e.target.style.backgroundColor = '#4E6C50';
    e.target.style.color = 'white';
  };

  const HamMypageButtonOffHover = e => {
    e.target.style.backgroundColor = '#4E6C50';
    e.target.style.color = 'white';
  };

  return (
    <React.Fragment>
      {/* QR코드를 보여줄 모달 */}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>QR코드를 비춰주세요</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" justifyContent="center" alignContent="center">
              <QRcode />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        color="white"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <chakra.h1
              color="#B99B6B"
              fontSize="2xl"
              fontWeight="extrabold"
              ml="2"
            >
              <Box cursor="pointer" onClick={() => navigate('/')}>
                BEHIND
              </Box>
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: 'inline-flex',
              }}
              // display={{
              //   base: 'none',
              //   md: 'inline-flex',
              // }}
            >
              <Button
                size={{
                  base: 'sm',
                  lg: 'md',
                }}
                px={{
                  base: 1,
                  lg: 3,
                }}
                onMouseOver={QRButtonOnHover}
                onMouseOut={QRButtonOffHover}
                fontSize={{
                  base: 'sm',
                  lg: 'xl',
                }}
                onClick={() => {
                  const token = getCookie('token');
                  if (!token) {
                    alert('로그인이 필요합니다');
                  } else {
                    return onOpen();
                  }
                }}
                variant="ghost"
              >
                QR
              </Button>
              <Button
                size={{
                  base: 'sm',
                  lg: 'md',
                }}
                px={{
                  base: 1,
                  lg: 3,
                }}
                onMouseOver={LikesButtonOnHover}
                onMouseOut={LikesButtonOffHover}
                fontSize={{
                  base: 'sm',
                  lg: 'xl',
                }}
                onClick={GoMyLikes}
                variant="ghost"
              >
                Likes
              </Button>
              <Button
                size={{
                  base: 'sm',
                  lg: 'md',
                }}
                px={{
                  base: 1,
                  lg: 3,
                }}
                onMouseOver={MypageButtonOnHover}
                onMouseOut={MypageButtonOffHover}
                fontSize={{
                  base: 'sm',
                  lg: 'xl',
                }}
                onClick={GoMyPage}
                variant="ghost"
              >
                MyPage
              </Button>
            </HStack>

            {/* <Box
              display={{
                base: 'inline-flex',
                md: 'none',
              }}
            >
              <IconButton
                display={{
                  base: 'flex',
                  md: 'none',
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="white"
                _dark={{
                  color: 'inherit',
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button
                  onMouseOver={HamQRButtonOnHover}
                  onMouseOut={HamQRButtonOffHover}
                  onClick={() => {
                    onOpen();
                    mobileNav.onClose();
                  }}
                  w="full"
                  variant="ghost"
                >
                  QR
                </Button>
                <Button
                  onMouseOver={HamLikesButtonOnHover}
                  onMouseOut={HamLikesButtonOffHover}
                  onClick={() => {
                    GoMyLikes();
                    mobileNav.onClose();
                  }}
                  w="full"
                  variant="ghost"
                >
                  Likes
                </Button>
                <Button
                  onMouseOver={HamMypageButtonOnHover}
                  onMouseOut={HamMypageButtonOffHover}
                  onClick={() => {
                    GoMyPage();
                    mobileNav.onClose();
                  }}
                  w="full"
                  variant="ghost"
                >
                  MyPage
                </Button>
              </VStack>
            </Box> */}
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default NavBar;
