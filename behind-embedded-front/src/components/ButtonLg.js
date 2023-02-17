import React from 'react'
import { Box } from '@chakra-ui/react'

const ButtonLg = ({ children, isSelected }) => {
  return (
    <Box
      px="4vw"
      py="2.5vw"
      color={isSelected ? 'white' : 'black'}
      bgColor={isSelected ? '#426C50' : 'gray'}
      fontSize="2.5vw"
      borderRadius="lg"
      textAlign="center">
      {children}
    </Box>
  )
}

export default ButtonLg
