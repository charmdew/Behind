import React from 'react'
import { Box } from '@chakra-ui/react'
import { QrScanner } from '@yudiel/react-qr-scanner'

const LoginQRScanPage = () => {
  const containerStyle = {
    width: '100vw',
    height: '100vh'
  }

  return (
    <Box w="100vw" h="100vh" bgColor="black">
      <Box w="100vh" m="auto">
        <QrScanner
          onDecode={(result) => console.log(result)}
          onError={(error) => console.log(error?.message)}
        />
      </Box>
    </Box>
  )
}

export default LoginQRScanPage
