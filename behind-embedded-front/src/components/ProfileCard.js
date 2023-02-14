import React from 'react'
import { Image, Box, Flex, Icon } from '@chakra-ui/react'
import { BsPhone } from 'react-icons/bs'
import { FiAtSign } from 'react-icons/fi'

const ProfileCard = (props) => {
  return (
    <Box id={props.id} w="320px" h="512px" px="10px" bgColor="white">
      <Box
        borderWidth="0.5px"
        borderStyle="solid"
        borderColor="blackAlpha.300"
        borderRadius="2xl"
        overflow="hidden"
        bgColor="black">
        <Image w="100%" h="380px" src={props.src} />
        <Flex direction="column" p="10px">
          <Flex direction="row" gap="10px" align="center">
            <Box
              as="span"
              fontSize="25px"
              fontWeight="extrabold"
              color="gray.200">
              {props.name}
            </Box>
            <Box as="span" fontSize="15px" color="gray.500">
              {props.tagString}
            </Box>
          </Flex>
          <Flex direction="column">
            <Flex direction="row" align="center" gap="2px">
              <Icon as={FiAtSign} boxSize="20px" color="gray.300" />
              <Box
                as="span"
                m="3px"
                fontStyle="italic"
                fontSize="14px"
                fontWeight="semibold"
                color="gray.300">
                {props.email}
              </Box>
            </Flex>
            <Flex direction="row" align="center" gap="2px">
              <Icon as={BsPhone} boxSize="20px" color="gray.300" />
              <Box
                as="span"
                m="3px"
                fontStyle="italic"
                fontSize="14px"
                fontWeight="semibold"
                color="gray.300">
                {props.phoneNum}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default ProfileCard
