import React, { useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { Box, Flex } from '@chakra-ui/react'
import { FaArrowsAlt } from 'react-icons/fa'
import { GiButtonFinger } from 'react-icons/gi'

import IconWithLabel from '../components/IconWithLabel'
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
      window.removeEventListener('keydown', keyDownHandler)
      const captureDataURL = capture()
      stopStreamedVideos()
      socketClient.send('remote', () => {
        socketClient.send('camreset')
      })

      navigate('/after-shoot', {
        state: { captureDataURL: captureDataURL, ...state }
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
    <Box w="100vw" h="100vh" bgColor="black">
      <Webcam
        ref={webcamRef}
        style={{ height: '100%' }}
        width={1920}
        height={1080}
        screenshotFormat="image/png"
        mirrored={true}
        videoConstraints={videoConstraints}
      />
      <Box
        position="absolute"
        top="50%"
        w="calc(100vw * 523 / 1920)"
        h="calc(100vw * 1080 / 1920)"
        bgColor="rgb(66 153 225 / .3)"
        style={{ transform: 'translate(0, -50%)' }}
      />
      <Box
        position="absolute"
        top="50%"
        right="0%"
        w="calc(100vw * 523 / 1920)"
        h="calc(100vw * 1080 / 1920)"
        bgColor="rgb(66 153 225 / .3)"
        style={{ transform: 'translate(0, -50%)' }}>
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          direction="column"
          gap="2vw"
          w="80%"
          p="2vw"
          bgColor="white"
          borderRadius="2xl"
          style={{ transform: 'translate(-50%, -50%)' }}>
          <IconWithLabel icon={FaArrowsAlt} label="카메라 이동" />
          <IconWithLabel icon={GiButtonFinger} label="촬영" />
        </Flex>
      </Box>
    </Box>
  )
}

export default PhotoShootPage
