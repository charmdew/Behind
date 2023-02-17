import React from 'react'
import { Image, Box, Flex, Icon } from '@chakra-ui/react'
import { BsPhone } from 'react-icons/bs'
import { FiAtSign } from 'react-icons/fi'

const ProfileCard = (props) => {
  return (
    <Box
      id={props.id}
      w={props.width + 'px'}
      h={(1024 / 640) * props.width + 'px'}
      px={(16 / 640) * props.width + 'px'}
      py={(8 / 640) * props.width + 'px'}>
      <Box
        borderWidth={(1 / 640) * props.width + 'px'}
        borderStyle="solid"
        borderColor="blackAlpha.300"
        borderRadius="2xl"
        overflow="hidden"
        bgColor="black">
        <Image w="100%" h={(760 / 640) * props.width + 'px'} src={props.src} />
        <Flex direction="column" p={(20 / 640) * props.width + 'px'}>
          <Flex
            direction="row"
            gap={(20 / 640) * props.width + 'px'}
            align="center">
            <Box
              as="span"
              fontSize={(50 / 640) * props.width + 'px'}
              fontWeight="extrabold"
              color="gray.200">
              {props.name}
            </Box>
            <Box
              as="span"
              fontSize={(30 / 640) * props.width + 'px'}
              color="gray.500">
              {props.tagString}
            </Box>
          </Flex>
          <Flex direction="column">
            <Flex
              direction="row"
              align="center"
              gap={(4 / 640) * props.width + 'px'}>
              <Icon
                as={FiAtSign}
                boxSize={(40 / 640) * props.width + 'px'}
                color="gray.300"
              />
              <Box
                as="span"
                m={(6 / 640) * props.width + 'px'}
                fontStyle="italic"
                fontSize={(28 / 640) * props.width + 'px'}
                fontWeight="semibold"
                color="gray.300">
                {props.email}
              </Box>
            </Flex>
            <Flex
              direction="row"
              align="center"
              gap={(4 / 640) * props.width + 'px'}>
              <Icon
                as={BsPhone}
                boxSize={(40 / 640) * props.width + 'px'}
                color="gray.300"
              />
              <Box
                as="span"
                m={(6 / 640) * props.width + 'px'}
                fontStyle="italic"
                fontSize={(28 / 640) * props.width + 'px'}
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
