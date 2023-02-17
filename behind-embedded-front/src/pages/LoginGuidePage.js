// Temp start
// Change qrGuideImage
// Temp end

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Center, Flex, Box, Image } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { GiButtonFinger } from 'react-icons/gi'

import Container from '../components/Container'
import Header from '../components/Header'
import ButtonSm from '../components/ButtonSm'
import IconWithLabel from '../components/IconWithLabel'
import qrGuideImage from '../assets/qr-guide-image.jpg'

const LoginGuidePage = () => {
  const navigate = useNavigate()

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') navigate('/login-qr-scan')
    if (e.key === 'ArrowLeft')
      navigate('/reset', { state: { prevPage: '/login-guide' } })
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  return (
    <Center w="100vw" h="100vh">
      <Container>
        <Header>로그인</Header>
        <Flex as="main" direction="row" justify="center" gap="5vw">
          <Flex direction="column" align="center" gap="3vw">
            <Box fontSize="3vw" textAlign="center">
              다음과 같이 <br />
              홈페이지 오른쪽 상단의 <br />
              QR 코드를 <br />
              카메라 정중앙에 <br />
              위치시켜주세요.
            </Box>
            <ButtonSm>확인</ButtonSm>
          </Flex>
          <Image
            w="40vw"
            objectFit="contain"
            src={qrGuideImage}
            alt="QR guide"
          />
        </Flex>
        <Flex direction="row" justify="end" gap="2vw">
          <IconWithLabel icon={FaArrowLeft} label="첫 화면" />
          <IconWithLabel icon={GiButtonFinger} label="선택" />
        </Flex>
      </Container>
    </Center>
  )
}

export default LoginGuidePage
