import React, { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from 'react-auth-kit'
import { ChakraProvider, theme } from '@chakra-ui/react'

import AfterShootPage from './pages/AfterShootPage'
import EndPage from './pages/EndPage'
import LoginGuidePage from './pages/LoginGuidePage'
import LoginQRScanPage from './pages/LoginQRScanPage'
import LoginResponsePage from './pages/LoginResponsePage'
import MenuSelectPage from './pages/MenuSelectPage'
import PhotoSelectPage from './pages/PhotoSelectPage'
import PhotoShootGuidePage from './pages/PhotoShootGuidePage'
import PhotoShootPage from './pages/PhotoShootPage'
import PhotoTransformPage from './pages/PhotoTransformPage'
import PrintMenuPage from './pages/PrintMenuPage'
import StartPage from './pages/StartPage'

function App() {
  const [imageSrc, setImageSrc] = useState(null)
  // Temp start
  const cookieDomain = window.location.hostname
  const cookieSecure = window.location.protocol === 'https:'
  // Temp end

  return (
    <AuthProvider
      authType={'cookie'}
      authName={'accesstoken'}
      cookieDomain={cookieDomain}
      cookieSecure={cookieSecure}>
      <ChakraProvider theme={theme}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/login-guide" element={<LoginGuidePage />} />
            <Route path="/login-qr-scan" element={<LoginQRScanPage />} />
            <Route path="/login-response" element={<LoginResponsePage />} />
            <Route path="/menu" element={<MenuSelectPage />} />
            <Route
              path="/photo-shoot-guide"
              element={<PhotoShootGuidePage />}
            />
            <Route
              path="/photo-shoot"
              element={<PhotoShootPage setImageSrc={setImageSrc} />}
            />
            <Route
              path="/after-shoot"
              element={<AfterShootPage imageSrc={imageSrc} />}
            />
            <Route path="/photo-transform" element={<PhotoTransformPage />} />
            <Route path="/photo-select" element={<PhotoSelectPage />} />
            <Route path="/print" element={<PrintMenuPage />} />
            <Route path="/end" element={<EndPage />} />
          </Routes>
        </HashRouter>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default App
