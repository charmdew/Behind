import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import AfterShootPage from './pages/AfterShootPage'
import EndPage from './pages/EndPage'
import LoginGuidePage from './pages/LoginGuidePage'
import LoginQRScanPage from './pages/LoginQRScanPage'
import LoginResponsePage from './pages/LoginResponsePage'
import MenuPage from './pages/MenuPage'
import PhotoSelectPage from './pages/PhotoSelectPage'
import PhotoSelectFromServerPage from './pages/PhotoSelectFromServerPage'
import PhotoShootGuidePage from './pages/PhotoShootGuidePage'
import PhotoShootPage from './pages/PhotoShootPage'
import PhotoTransformPage from './pages/PhotoTransformPage'
import PrintPage from './pages/PrintPage'
import ResetPage from './pages/ResetPage'
import StartPage from './pages/StartPage'
import SocketClient from './features/SocketClient'

function App() {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: 'teal'
        }
      }
    }
  })

  const socketClient = new SocketClient('12345', '127.0.0.1')

  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login-guide" element={<LoginGuidePage />} />
          <Route path="/login-qr-scan" element={<LoginQRScanPage />} />
          <Route path="/login-response" element={<LoginResponsePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/photo-shoot-guide" element={<PhotoShootGuidePage />} />
          <Route
            path="/photo-shoot"
            element={<PhotoShootPage socketClient={socketClient} />}
          />
          <Route path="/after-shoot" element={<AfterShootPage />} />
          <Route path="/photo-transform" element={<PhotoTransformPage />} />
          <Route path="/photo-select" element={<PhotoSelectPage />} />
          <Route
            path="/photo-select-from-server"
            element={<PhotoSelectFromServerPage />}
          />
          <Route
            path="/print"
            element={<PrintPage socketClient={socketClient} />}
          />
          <Route path="/end" element={<EndPage />} />
          <Route path="/reset" element={<ResetPage />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App
