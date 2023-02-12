import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrScanner } from '@yudiel/react-qr-scanner'
import jwt_decode from 'jwt-decode'
import { Center, Box, Flex } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'

import IconWithLabel from '../components/IconWithLabel'
import stopStreamedVideos from '../utils/stopStreamedVideos'

const LoginQRScanPage = () => {
  const navigate = useNavigate()

  const keyDownHandler = (e) => {
    if (e.key === 'ArrowLeft') {
      stopStreamedVideos()
      navigate('/reset', { state: { prevPage: '/login-qr-scan' } })
    }
    // Temp start
    if (e.key === 'Enter') {
      stopStreamedVideos()
      navigate('/login-response', {
        state: {
          'X-AUTH-TOKEN':
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNiIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2MjEyNzE3LCJleHAiOjE2NzYyMTQ1MTd9.swbj5z1dfqYD9O6tena4_3d5-NFvjrXyxlHv5NUl8ro'
        }
      })
    }
    // Temp end
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  return (
    <Center w="100vw" h="100vh" bgColor="black">
      <Box w="calc((100% - 100vh) / 2)"></Box>
      <Box w="100vh">
        <QrScanner
          onDecode={(result) => {
            try {
              jwt_decode(result)
              stopStreamedVideos()
              navigate('/login-response', { state: { 'X-AUTH-TOKEN': result } })
            } catch (error) {
              console.error(error)
            }
          }}
          onError={(error) => {
            console.error(error)
          }}
        />
      </Box>
      <Box w="calc((100% - 100vh) / 2)">
        <Flex
          direction="column"
          gap="2vw"
          m="2vw"
          p="1vw"
          bgColor="white"
          borderRadius="2xl">
          <IconWithLabel icon={FaArrowLeft} label="첫 화면" />
        </Flex>
      </Box>
    </Center>
  )
}

export default LoginQRScanPage
