import React from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Text, Flex } from '@chakra-ui/react';

const StartPage = () => {
  const navigate = useNavigate()

  window.addEventListener('keydown', (e) => {
      if (e.key === "Enter")
      navigate("/login-guide")
    },
    true)

  return (
    <Box
      w="100vw"
      h="100vh"
      p="5%"
      bgColor="teal"
    >
      <Flex
        w="100%"
        h="100%"
        direction="column"
        justify="center"
      >
        <Text
          w="100%" 
          textAlign="center"
          fontSize="9xl"
          color="white"
        >
          Behind
        </Text>
        <Text
          textAlign="center"
          fontSize="6xl"
          color="white"
        >
          버튼을 클릭해주세요
        </Text>   
      </Flex>
    </Box>
  )
}

export default StartPage