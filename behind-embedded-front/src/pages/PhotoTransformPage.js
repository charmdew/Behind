import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Center, Flex, Box, Spinner } from '@chakra-ui/react'

import Container from '../components/Container'
import Header from '../components/Header'
import dataURLtoFile from '../utils/dataURLToFile'

const PhotoTransformPage = ({ urls }) => {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const imageTransformServerURL = urls.imageTransformServerURL

    async function handleData() {
      const croppedCaptureFormData = new FormData()
      croppedCaptureFormData.append(
        'photo',
        dataURLtoFile(state.croppedCaptureDataURL, 'croppedCaptureFile')
      )

      const res = await fetch(imageTransformServerURL, {
        method: 'POST',
        body: croppedCaptureFormData
      })
        .then((res) => {
          if (res.status >= 400 && res.status < 600) {
            throw new Error('Bad response from server')
          }
          return res
        })
        .catch(() => {
          const { croppedCaptureDataURL, ...newState } = state
          navigate('/error', {
            state: {
              redirectPage: '/photo-shoot-guide',
              msg: '얼굴이 잘 나오게 찍어주세요',
              ...newState
            }
          })
        })

      const resObj = await res.json()
      const imageBase64Set = resObj.images

      const { croppedCaptureDataURL, ...newState } = state
      newState.imageBase64Set = imageBase64Set
      navigate('/photo-select', { state: newState })
    }

    handleData()
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
          <Spinner size="xl" />
        </Flex>
      </Container>
    </Center>
  )
}

export default PhotoTransformPage
