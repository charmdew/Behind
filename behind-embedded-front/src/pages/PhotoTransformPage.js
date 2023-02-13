// Temp start
// Change imageTransformServerURL
// Change behindServerURL
// How can I upload image set?
// Temp end

import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Center, Flex, Box, Spinner } from '@chakra-ui/react'

import Container from '../components/Container'
import Header from '../components/Header'
import dataURLtoFile from '../utils/dataURLToFile'

const PhotoTransformPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  // Temp start
  useEffect(() => {
    const imageTransformServerURL =
      'https://2c91-221-138-65-42.jp.ngrok.io/images/style-transfer'
    const imageUploadURL =
      'http://ec2-13-209-17-196.ap-northeast-2.compute.amazonaws.com:8080/images'

    async function handleData() {
      const croppedCaptureFormData = new FormData()
      croppedCaptureFormData.append(
        'photo',
        dataURLtoFile(state.croppedCaptureDataURL, 'croppedCaptureFile')
      )

      const res = await fetch(imageTransformServerURL, {
        method: 'POST',
        body: croppedCaptureFormData
      }).catch(() => {
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

      // let promises = []
      // for (let imageBase64 of imageBase64Set) {
      //   const transformedPhotoFormData = new FormData()
      //   transformedPhotoFormData.append(
      //     'multipartFile',
      //     dataURLtoFile('data:image/jpeg;base64,' + imageBase64, 'multipartFile')
      //   )
      //   promises.push(
      //     fetch(imageUploadURL, {
      //       method: 'POST',
      //       body: transformedPhotoFormData,
      //       headers: {
      //         'X-AUTH-TOKEN': state['X-AUTH-TOKEN']
      //       }
      //     })
      //   )
      // }
      // Promise.all(promises).then('upload complete  ')

      const { croppedCaptureDataURL, ...newState } = state
      newState.imageBase64Set = imageBase64Set
      navigate('/photo-select', { state: newState })
    }

    handleData()
  }, [])
  // Temp end

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
