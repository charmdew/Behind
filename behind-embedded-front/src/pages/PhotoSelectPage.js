// Temp start
// Upload profile image
// Temp end

import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { Center, Flex, Image } from '@chakra-ui/react'
import { FaArrowsAltH, FaArrowUp } from 'react-icons/fa'
import { GiButtonFinger } from 'react-icons/gi'

import '../assets/splide-style.css'
import Container from '../components/Container'
import Header from '../components/Header'
import IconWithLabel from '../components/IconWithLabel'

const PhotoSelectPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const splideRef = useRef()

  const keyDownHandler = (e) => {
    if (e.key === 'ArrowUp')
      navigate('/reset', { state: { prevPage: '/photo-select', ...state } })
    if (e.key === 'ArrowLeft') splideRef.current.splide.go('<')
    if (e.key === 'ArrowRight') splideRef.current.splide.go('>')
    if (e.key === 'Enter') {
      const profileImageDataURL = document
        .querySelector('li.is-active > img')
        .getAttribute('src')
      navigate('/print', {
        state: {
          profileImageDataURL: profileImageDataURL,
          ...state
        }
      })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  return (
    <Center w="100vw" h="100vh">
      <Container>
        <Header>이미지 선택</Header>
        <Splide
          ref={splideRef}
          options={{
            type: 'loop',
            fixedWidth: '30vw',
            fixedHeight: '40vw',
            gap: '3vw',
            focus: 'center',
            arrows: false,
            pagination: false
          }}>
          {state.imageBase64Set.map((image, index) => (
            <SplideSlide key={index}>
              <Image w="100%" src={'data:image/jpeg;base64,' + image} />
            </SplideSlide>
          ))}
          {/* Temp start
          <SplideSlide>
            <Image w="90%" src="https://picsum.photos/324/400" />
          </SplideSlide>
          <SplideSlide>
            <Image w="90%" src="https://picsum.photos/324/400" />
          </SplideSlide>
          <SplideSlide>
            <Image w="90%" src="https://picsum.photos/324/400" />
          </SplideSlide>
          <SplideSlide>
            <Image w="90%" src="https://picsum.photos/324/400" />
          </SplideSlide>
          Temp end */}
        </Splide>
        <Flex direction="row" justify="end" gap="2vw">
          <IconWithLabel icon={FaArrowUp} label="첫 화면" />
          <IconWithLabel icon={FaArrowsAltH} label="이동" />
          <IconWithLabel icon={GiButtonFinger} label="선택" />
        </Flex>
      </Container>
    </Center>
  )
}

export default PhotoSelectPage
