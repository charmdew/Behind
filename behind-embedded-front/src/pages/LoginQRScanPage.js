// Temp start
// Should inform about buttons
// Temp end

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrScanner } from '@yudiel/react-qr-scanner'
import jwt_decode from 'jwt-decode'
import { Center, Box } from '@chakra-ui/react'

import stopStreamedVideos from '../utils/stopStreamedVideos'

const LoginQRScanPage = () => {
  const navigate = useNavigate()

  const keyDownHandler = (e) => {
    if (e.key === 'ArrowLeft') stopStreamedVideos()
    navigate('/reset', { state: { prevPage: '/login-qr-scan' } })
    // Temp start
    if (e.key === 'Enter') {
      stopStreamedVideos()
      navigate('/login-response', {
        state: { 'X-AUTH-TOKEN': 'some-jwt-token' }
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
    </Center>
  )
}

export default LoginQRScanPage
