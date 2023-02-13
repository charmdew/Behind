import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Center, Flex, Box } from '@chakra-ui/react'
import { GiButtonFinger } from 'react-icons/gi'

import Container from '../components/Container'
import Header from '../components/Header'
import ButtonSm from '../components/ButtonSm'
import IconWithLabel from '../components/IconWithLabel'

const ErrorPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      const { redirectPage, msg, ...newState } = state
      navigate(state.redirectPage, { state: newState })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  return (
    <Center w="100vw" h="100vh">
      <Container>
        <Header>오류 발생</Header>
        <Flex as="main" direction="row" justify="center" gap="5vw">
          <Flex direction="column" align="center" gap="3vw">
            <Box fontSize="3vw" textAlign="center">
              {state.msg}
            </Box>
            <ButtonSm>확인</ButtonSm>
          </Flex>
        </Flex>
        <Flex direction="row" justify="end" gap="2vw">
          <IconWithLabel icon={GiButtonFinger} label="선택" />
        </Flex>
      </Container>
    </Center>
  )
}

export default ErrorPage
