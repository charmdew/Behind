import React, { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { Box } from '@chakra-ui/react'

// Temp start
// frame needed
// Temp

const PhotoShootPage = ({ setImageSrc }) => {
  const navigate = useNavigate()
  const webcamRef = useRef(null)
  const capture = useCallback(() => {
    return webcamRef.current.getScreenshot()
  }, [webcamRef])

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      setImageSrc(capture())
      navigate('/after-shoot')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  const videoConstraints = {
    width: { min: 640, ideal: 1920 },
    height: { min: 400, ideal: 1080 },
    aspectRatio: { ideal: 1.7777777778 }
  }
  return (
    <Box bgColor="black">
      <Webcam
        ref={webcamRef}
        style={{ height: '100vh' }}
        width={1920}
        height={1080}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </Box>
  )
}

export default PhotoShootPage
