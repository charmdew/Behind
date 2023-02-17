// Temp start
// Style change needed
// Temp end

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Center, Box, Flex, Image } from '@chakra-ui/react'
import logo from '../assets/logo.png'

const StartPage = () => {
  const navigate = useNavigate()

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') navigate('/login-guide')
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  return (
    <Center w="100vw" h="100vh">
      <Flex w="80vw" direction="column">
        <Image src={logo} alt="Logo" />
        <Box fontSize="5vw" color="white" textAlign="center">
          가운데 버튼을 클릭해주세요
        </Box>
      </Flex>
    </Center>
  )
}

export default StartPage
