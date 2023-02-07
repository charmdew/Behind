import React from 'react'
import { Box, Image, Flex } from '@chakra-ui/react'

const Layout = ({ heading, body, imageSrc, imageAlt, isButton }) => {
  return (
    <Box w="100vw" h="100vh" p="5%" bgColor="teal">
      <Flex
        direction="column"
        justify="center"
        w="100%"
        h="100%"
        p="5%"
        gap="5%"
        bgColor="white"
        borderRadius="lg">
        <Box as="header" fontSize="4vw" fontWeight="bold" textAlign="center">
          {heading}
        </Box>
        <Flex direction="row" justify="center" gap="5vw">
          <Flex direction="column" justify="center" align="center" gap="3vh">
            <Box as="main" fontSize="3vw" textAlign="center">
              {body}
            </Box>
            {showButton(isButton)}
          </Flex>
          {showImage(imageSrc, imageAlt)}
        </Flex>
      </Flex>
    </Box>
  )
}

const showButton = (isButton) => {
  if (isButton) {
    return (
      <Box
        px="4vw"
        py="1.5vh"
        color="white"
        bgColor="teal"
        fontSize="3vw"
        borderRadius="lg">
        확인
      </Box>
    )
  }
}

const showImage = (imageSrc, imageAlt) => {
  if (imageSrc) {
    return <Image w="40vw" objectFit="contain" src={imageSrc} alt={imageAlt} />
  }
}

export default Layout
