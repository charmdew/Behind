import * as fs from 'node:fs'
const os = require('node:os')

import React, { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import AfterShootPage from './pages/AfterShootPage'
import EndPage from './pages/EndPage'
import ErrorPage from './pages/ErrorPage'
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
import PrintFromServerPage from './pages/PrintFromServerPage'
import ResetPage from './pages/ResetPage'
import StartPage from './pages/StartPage'
import SocketClient from './features/SocketClient'

function App() {
  const [urls, setUrls] = useState({})

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: '#426C50'
        }
      }
    }
  })

  const socketClient = new SocketClient('12345', '127.0.0.1')

  useEffect(() => {
    fs.readFile(os.homedir() + '/behind_config.json', (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      const dataObj = JSON.parse(data)
      setUrls(dataObj)
    })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login-guide" element={<LoginGuidePage />} />
          <Route
            path="/login-qr-scan"
            element={<LoginQRScanPage socketClient={socketClient} />}
          />
          <Route path="/login-response" element={<LoginResponsePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/photo-shoot-guide" element={<PhotoShootGuidePage />} />
          <Route
            path="/photo-shoot"
            element={<PhotoShootPage socketClient={socketClient} />}
          />
          <Route path="/after-shoot" element={<AfterShootPage />} />
          <Route
            path="/photo-transform"
            element={<PhotoTransformPage urls={urls} />}
          />
          <Route
            path="/photo-select"
            element={<PhotoSelectPage urls={urls} />}
          />
          <Route
            path="/photo-select-from-server"
            element={<PhotoSelectFromServerPage />}
          />
          <Route
            path="/print"
            element={<PrintPage socketClient={socketClient} urls={urls} />}
          />
          <Route
            path="/print"
            element={<PrintFromServerPage socketClient={socketClient} />}
          />
          <Route path="/end" element={<EndPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App
