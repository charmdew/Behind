import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Center, Flex, Image } from '@chakra-ui/react'
import { FaArrowLeft, FaArrowsAltV } from 'react-icons/fa'
import { GiButtonFinger } from 'react-icons/gi'

import Container from '../components/Container'
import Header from '../components/Header'
import ButtonLg from '../components/ButtonLg'
import IconWithLabel from '../components/IconWithLabel'
import cropImageToFitProfileCard from '../features/cropImageToFitProfileCard'

const AfterShootPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [selection, setSelection] = useState('up')
  const [croppedCaptureDataURL, setCroppedCaptureDataURL] = useState(null)

  cropImageToFitProfileCard(state.captureDataURL, setCroppedCaptureDataURL)

  const keyDownHandler = (e) => {
    if (e.key === 'ArrowLeft')
      navigate('/reset', { state: { prevPage: '/after-shoot', ...state } })
    if (e.key === 'ArrowUp') setSelection('up')
    if (e.key === 'ArrowDown') setSelection('down')
    if (e.key === 'Enter') {
      if (selection === 'up') {
        const { captureDataURL, ...newState } = state
        navigate('/photo-transform', {
          state: { croppedCaptureDataURL: croppedCaptureDataURL, ...newState }
        })
      }
      if (selection === 'down') {
        const { captureDataURL, ...newState } = state
        navigate('/photo-shoot', { state: newState })
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [selection, croppedCaptureDataURL])

  return (
    <Center w="100vw" h="100vh">
      <Container>
        <Header>촬영 완료</Header>
        <Flex as="main" direction="row" justify="center" gap="5vw">
          <Flex direction="column" justify="center" gap="3vw">
            <ButtonLg isSelected={selection === 'up'}>다음</ButtonLg>
            <ButtonLg isSelected={selection === 'down'}>다시 찍기</ButtonLg>
          </Flex>
          <Image
            w="50.5vh"
            h="60vh"
            objectFit="contain"
            borderRadius="2xl"
            src={croppedCaptureDataURL}
            fallbackSrc="https://via.placeholder.com/640x760"
            alt="Cropped capture"
          />
        </Flex>
        <Flex direction="row" justify="end" gap="2vw">
          <IconWithLabel icon={FaArrowLeft} label="첫 화면" />
          <IconWithLabel icon={FaArrowsAltV} label="이동" />
          <IconWithLabel icon={GiButtonFinger} label="선택" />
        </Flex>
      </Container>
    </Center>
  )
}

export default AfterShootPage
