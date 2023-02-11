// Temp start
// Add spinner
// Change requestURL
// Upload images to server
// Temp end

import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Center, Flex, Box } from '@chakra-ui/react'

import Container from '../components/Container'
import Header from '../components/Header'
import dataURLtoFile from '../utils/dataURLToFile'

const PhotoTransformPage = () => {
  const requestURL = 'https://d481-221-138-65-42.jp.ngrok.io/nst'

  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const formData = new FormData()
    formData.append(
      'photo',
      dataURLtoFile(state.croppedCaptureDataURL, 'croppedCaptureFile')
    )
    fetch(requestURL, {
      method: 'POST',
      body: formData
    })
      .then((res) => {
        if (res.status === 400) {
          throw Error('Status code 400')
        }
        if (res.status === 500) {
          throw Error('Status code 500')
        }
        return res.json()
      })
      .then((data) => {
        const { croppedCaptureDataURL, ...newState } = state
        newState.imageSet = data.images
        navigate('/photo-select', { state: newState })
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <Center w="100vw" h="100vh">
      <Container>
        <Header>이미지 처리</Header>
        <Flex direction="column" align="center" gap="3vw">
          <Box fontSize="3vw" textAlign="center">
            이미지를 처리하고 있습니다. <br />
            잠시만 기다려주세요.
          </Box>
        </Flex>
      </Container>
    </Center>
  )
}

export default PhotoTransformPage
