// Temp start
// Change photoShootGuideImage
// Temp end

import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Center, Flex, Box, Image } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { GiButtonFinger } from 'react-icons/gi'

import Container from '../components/Container'
import Header from '../components/Header'
import ButtonSm from '../components/ButtonSm'
import IconWithLabel from '../components/IconWithLabel'
import photoShootGuideImage from '../assets/photo-shoot-guide-image.png'

const PhotoShootGuidePage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') navigate('/photo-shoot', { state: state })
    if (e.key === 'ArrowLeft')
      navigate('/reset', {
        state: { prevPage: '/photo-shoot-guide', ...state }
      })
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  return (
    <Center w="100vw" h="100vh">
      <Container>
        <Header>사진 촬영</Header>
        <Flex as="main" direction="row" justify="center" gap="5vw">
          <Flex direction="column" align="center" gap="3vw">
            <Box fontSize="3vw" textAlign="center">
              가운데 프레임에 맞추어 <br />
              사진을 촬영해주세요.
            </Box>
            <ButtonSm>확인</ButtonSm>
          </Flex>
          <Image
            w="40vw"
            objectFit="contain"
            src={photoShootGuideImage}
            alt="Photo shoot guide"
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

export default PhotoShootGuidePage
