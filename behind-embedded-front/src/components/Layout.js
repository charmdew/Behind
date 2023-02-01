import React from 'react'
import { Box, Image, Text, Flex, Heading } from '@chakra-ui/react';

const Layout = ({ heading, body, imageSrc }) => {
  return (
    <Flex w="100vw" h="100vh">
      <Flex direction="column" m="auto" w="90%" h="90%" bgColor="teal">
        <Heading h="100px">
          {heading}
        </Heading>
        <Flex>  
          <Text>
            {body}
          </Text>
          <Image
            boxSize='100px'
            objectFit='cover'
            src={imageSrc}
            alt='Dan Abramov'
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Layout