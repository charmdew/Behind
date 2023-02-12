import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Center, Flex, Box } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { GiButtonFinger } from 'react-icons/gi'

import Container from '../components/Container'
import ButtonSm from '../components/ButtonSm'
import IconWithLabel from '../components/IconWithLabel'

const EndPage = () => {
  const navigate = useNavigate()

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') navigate('/')
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  return (
    <Center w="100vw" h="100vh">
      <Container>
        <Flex as="main" direction="row" justify="center" gap="5vw">
          <Flex direction="column" align="center" gap="3vw">
            <Box fontSize="3vw" textAlign="center">
              곧 출력이 완료됩니다. <br />
              이용해주셔서 <br />
              감사합니다!
            </Box>
            <ButtonSm>확인</ButtonSm>
          </Flex>
        </Flex>
        <Flex direction="row" justify="end" gap="2vw">
          <IconWithLabel icon={GiButtonFinger} label="첫 화면" />
        </Flex>
      </Container>
    </Center>
  )
}

export default EndPage
