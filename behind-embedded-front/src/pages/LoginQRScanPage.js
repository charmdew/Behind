import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'
import { Box } from '@chakra-ui/react'
import { QrScanner } from '@yudiel/react-qr-scanner'
import jwt_decode from 'jwt-decode'

const LoginQRScanPage = () => {
  const navigate = useNavigate()
  const signIn = useSignIn()

  // Temp start
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYWthbzI2NTIwMTM3ODgiLCJyb2xlIjoiVEVNUCIsImlhdCI6MTY3NTYxMjkyNywiZXhwIjoxNjc2MjE3NzI3fQ.WB6NIO6IOSpidyvWQ5S5KxSQgvDPw3gWWgVzCaQYbRQ'
  // Temp end

  const keyDownHandler = (e) => {
    // Temp start
    // explanation needed
    // Temp end
    if (e.key === 'ArrowLeft') navigate('/login-guide')
    // Temp start
    if (e.key === 'Enter') navigate('/login-response')
    // Temp end
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
    <Box w="100vw" h="100vh" bgColor="black">
      <Box w="100vh" m="auto">
        <QrScanner
          onDecode={(result) => {
            try {
              // Temp start
              jwt_decode(ACCESS_TOKEN)
              // Temp end
              signIn({
                token: result,
                expiresIn: 30,
                tokenType: 'Bearer'
              })
            } catch (error) {
              console.error(error)
            }
            navigate('/login-response')
          }}
          onError={(error) => {
            console.error(error)
            navigate('/login-response')
          }}
        />
      </Box>
    </Box>
  )
}

export default LoginQRScanPage
