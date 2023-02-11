// Temp start
// Should inform about buttons
// Need frame
// Temp end

import React, { useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { Center } from '@chakra-ui/react'

import stopStreamedVideos from '../utils/stopStreamedVideos'

const PhotoShootPage = ({ socketClient }) => {
  socketClient.send('camera')
  const { state } = useLocation()
  const navigate = useNavigate()
  const webcamRef = useRef(null)
  const capture = useCallback(() => {
    return webcamRef.current.getScreenshot()
  }, [webcamRef])

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      const captureDataURL = capture()
      stopStreamedVideos()
      socketClient.send('remote')
      navigate('/after-shoot', {
        state: { captureDataURL: captureDataURL, ...state }
      })
    }
    if (e.key === 'ArrowLeft') {
      socketClient.send('remote')
      navigate('/reset', {
        state: { prevPage: '/photo-shoot', ...state }
      })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  const videoConstraints = {
    width: { min: 640, ideal: 1920 },
    height: { min: 400, ideal: 1080 },
    aspectRatio: { ideal: 1.7777777778 }
  }

  return (
    <Center w="100vw" h="100vh" bgColor="black">
      <Webcam
        ref={webcamRef}
        style={{ height: '100%' }}
        width={1920}
        height={1080}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </Center>
  )
}

export default PhotoShootPage
