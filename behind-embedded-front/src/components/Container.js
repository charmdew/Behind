import React from 'react'
import { Flex } from '@chakra-ui/react'

const Container = ({ children }) => {
  return (
    <Flex
      direction="column"
      justify="center"
      w="90%"
      h="90%"
      p="5%"
      gap="3vw"
      bgColor="white"
      borderRadius="lg">
      {children}
    </Flex>
  )
}

export default Container
