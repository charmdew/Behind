import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrScanner } from '@yudiel/react-qr-scanner'
import jwt_decode from 'jwt-decode'
import { Center, Box, Flex } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'

import IconWithLabel from '../components/IconWithLabel'
import stopStreamedVideos from '../utils/stopStreamedVideos'

const LoginQRScanPage = ({ socketClient }) => {
  const navigate = useNavigate()

  const keyDownHandler = (e) => {
    if (e.key === 'ArrowLeft') {
      stopStreamedVideos()
      socketClient.send('camreset')
      navigate('/reset', { state: { prevPage: '/login-qr-scan' } })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  return (
    <Center w="100vw" h="100vh" bgColor="black">
      <Box w="calc((100% - 100vh) / 2)" />
      <Box w="100vh">
        <QrScanner
          onDecode={(result) => {
            try {
              jwt_decode(result)
              stopStreamedVideos()
              socketClient.send('camreset')
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
          w="80%"
          p="2vw"
          m="auto"
          bgColor="white"
          borderRadius="2xl">
          <IconWithLabel icon={FaArrowLeft} label="첫 화면" />
        </Flex>
      </Box>
    </Center>
  )
}

export default LoginQRScanPage
