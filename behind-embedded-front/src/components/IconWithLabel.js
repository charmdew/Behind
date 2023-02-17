import React from 'react'
import { Flex, Icon, Box } from '@chakra-ui/react'

const IconWithLabel = ({ icon, label }) => {
  return (
    <Flex direction="row" gap="1vw" alignItems="center">
      <Icon as={icon} boxSize="2vw" />
      <Box fontSize="2vw">{label}</Box>
    </Flex>
  )
}

export default IconWithLabel
