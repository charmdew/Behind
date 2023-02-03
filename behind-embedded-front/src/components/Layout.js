import React from 'react'
import { Box, Image, Text, Flex, Heading, Button } from '@chakra-ui/react'

const Layout = ({ heading, body, imageSrc, imageAlt }) => {
  return (
    <Box w="100vw" h="100vh" p="5%" bgColor="teal">
      <Flex
        direction="column"
        w="100%"
        h="100%"
        p="5%"
        bgColor="white"
        borderRadius="lg">
        <Heading p="8" textAlign="center">
          {heading}
        </Heading>
        <Flex
          direction="row"
          flexGrow="1"
          justify="space-between"
          align="center">
          <Flex direction="column" align="center">
            <Text flexGrow="1" fontSize="xx-large" textAlign="center">
              {body}
            </Text>
            <Button colorScheme="teal" size="lg" w="fit-content" m="8">
              확인
            </Button>
          </Flex>
          {showImage(imageSrc, imageAlt)}
        </Flex>
      </Flex>
    </Box>
  )
}

const showImage = (imageSrc, imageAlt) => {
  if (imageSrc) {
    return (
      <Image m="8" w="50%" objectFit="contain" src={imageSrc} alt={imageAlt} />
    )
  }
}

export default Layout
