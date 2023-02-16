import React from 'react'
import { Box } from '@chakra-ui/react'

const ButtonSm = ({ children }) => {
  return (
    <Box
      px="3vw"
      py="1.5vw"
      color="white"
      bgColor="#426C50"
      fontSize="2.5vw"
      borderRadius="lg">
      {children}
    </Box>
  )
}

export default ButtonSm
