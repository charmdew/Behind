import React from 'react'
import { Image, Box, Flex, Icon } from '@chakra-ui/react'
import { BsPhone } from 'react-icons/bs'
import { FiAtSign } from 'react-icons/fi'

const ProfileCard = (props) => {
  return (
    <Box
      id={props.id}
      borderWidth="0.5px"
      borderStyle="solid"
      borderColor="blackAlpha.300"
      borderRadius="2xl"
      bgColor="white"
      w="324px"
      h="516px"
      overflow="hidden">
      <Image w="100%" h="400px" src={props.src} />
      <Flex direction="column" p="10px">
        <Flex direction="row" gap="10px" align="center">
          <Box as="span" fontSize="25px" fontWeight="extrabold">
            {props.name}
          </Box>
          <Box as="span" fontSize="15px" color="blackAlpha.600">
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
              fontWeight="semibold">
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
              fontWeight="semibold">
              {props.phoneNum}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ProfileCard
