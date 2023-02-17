import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Center, Flex, Box } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { GiButtonFinger } from 'react-icons/gi'

import Container from '../components/Container'
import Header from '../components/Header'
import ButtonSm from '../components/ButtonSm'
import IconWithLabel from '../components/IconWithLabel'

const LoginResponsePage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') navigate('/menu', { state: state })
    if (e.key === 'ArrowLeft')
      navigate('/reset', { state: { prevPage: '/login-response', ...state } })
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  return (
    <Center w="100vw" h="100vh">
      <Container>
        <Header>로그인</Header>
        <Flex direction="column" align="center" gap="3vw">
          <Box fontSize="3vw" textAlign="center">
            로그인에 성공하였습니다.
          </Box>
          <ButtonSm>확인</ButtonSm>
        </Flex>
        <Flex direction="row" justify="end" gap="2vw">
          <IconWithLabel icon={FaArrowLeft} label="첫 화면" />
          <IconWithLabel icon={GiButtonFinger} label="선택" />
        </Flex>
      </Container>
    </Center>
  )
}

export default LoginResponsePage
