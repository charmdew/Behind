import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { UsersStateContext } from '../App';

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

const NavBar = () => {
  const { loginUser } = useContext(UsersStateContext);
  const loginUserId = loginUser.id;

  const bg = useColorModeValue('#822727', 'gray.800');
  const mobileNav = useDisclosure();
  // 모달 컨트롤러
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 라우트 네비게이터
  const navigate = useNavigate();

  // Likes으로 가라
  const GoMyLikes = () => {
    return navigate(`/likes/${loginUserId}`);
  };
  // MyPage으로 가라
  const GoMyPage = () => {
    return navigate('/mypage');
  };

  // 버튼 CSS
  const QRButtonOnHover = e => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#822727';
  };
  const LikesButtonOnHover = e => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#822727';
  };
  const MypageButtonOnHover = e => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#822727';
  };
  const QRButtonOffHover = e => {
    e.target.style.backgroundColor = '#822727';
    e.target.style.color = 'white';
  };
  const LikesButtonOffHover = e => {
    e.target.style.backgroundColor = '#822727';
    e.target.style.color = 'white';
  };

  const MypageButtonOffHover = e => {
    e.target.style.backgroundColor = '#822727';
    e.target.style.color = 'white';
  };

  return (
    <React.Fragment>
      {/* QR코드를 보여줄 모달 */}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>QRQRQRQR</ModalBody>
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
              color="#FAECD6"
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
                base: 'none',
                md: 'inline-flex',
              }}
            >
              <Button
                onMouseOver={QRButtonOnHover}
                onMouseOut={QRButtonOffHover}
                fontSize="xl"
                onClick={onOpen}
                variant="ghost"
              >
                QR
              </Button>
              <Button
                onMouseOver={LikesButtonOnHover}
                onMouseOut={LikesButtonOffHover}
                fontSize="xl"
                onClick={GoMyLikes}
                variant="ghost"
              >
                Likes
              </Button>
              <Button
                onMouseOver={MypageButtonOnHover}
                onMouseOut={MypageButtonOffHover}
                fontSize="xl"
                onClick={GoMyPage}
                variant="ghost"
              >
                MyPage
              </Button>
            </HStack>

            <Box
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

                <Button onClick={onOpen} w="full" variant="ghost">
                  QR
                </Button>
                <Button onClick={GoMyLikes} w="full" variant="ghost">
                  Likes
                </Button>
                <Button onClick={GoMyPage} w="full" variant="ghost">
                  MyPage
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default NavBar;
