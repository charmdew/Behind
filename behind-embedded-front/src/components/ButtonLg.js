import React from 'react'
import { Box } from '@chakra-ui/react'

const ButtonLg = ({ children, isSelected }) => {
  return (
    <Box
      px="5vw"
      py="3vw"
      color={isSelected ? 'white' : 'black'}
      bgColor={isSelected ? 'teal' : 'gray'}
      fontSize="4vw"
      borderRadius="lg"
      textAlign="center">
      {children}
    </Box>
  )
}

export default ButtonLg
