import React from 'react'
import { Box } from '@chakra-ui/react'

const Header = ({ children }) => {
  return (
    <Box as="header" fontSize="4vw" fontWeight="bold" textAlign="center">
      {children}
    </Box>
  )
}

export default Header
