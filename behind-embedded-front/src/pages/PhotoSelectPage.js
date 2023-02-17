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
import dataURLtoFile from '../utils/dataURLToFile'

const PhotoSelectPage = ({ urls }) => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const splideRef = useRef()

  const keyDownHandler = (e) => {
    if (e.key === 'ArrowUp')
      navigate('/reset', { state: { prevPage: '/photo-select', ...state } })
    if (e.key === 'ArrowLeft') splideRef.current.splide.go('<')
    if (e.key === 'ArrowRight') splideRef.current.splide.go('>')
    if (e.key === 'Enter') {
      const imageUploadURL = urls.imageUploadURL

      const otherImageEls = document.querySelectorAll(
        'li:not(.splide__slide--clone, .is-active) > img'
      )

      const otherImageDataURLs = []
      for (let imageEl of otherImageEls) {
        otherImageDataURLs.push(imageEl.getAttribute('src'))
      }

      let promises = []
      for (let otherImageDataURL of otherImageDataURLs) {
        const otherImageFormData = new FormData()
        otherImageFormData.append(
          'multipartFile',
          dataURLtoFile(otherImageDataURL, 'multipartFile')
        )
        promises.push(
          fetch(imageUploadURL, {
            method: 'POST',
            body: otherImageFormData,
            headers: {
              'X-AUTH-TOKEN': state['X-AUTH-TOKEN']
            }
          })
        )
      }

      Promise.all(promises).then(() => {
        const profileImageDataURL = document
          .querySelector('li.is-active > img')
          .getAttribute('src')
        const profileImageFormData = new FormData()
        profileImageFormData.append(
          'multipartFile',
          dataURLtoFile(profileImageDataURL, 'multipartFile')
        )

        fetch(imageUploadURL, {
          method: 'POST',
          body: profileImageFormData,
          headers: {
            'X-AUTH-TOKEN': state['X-AUTH-TOKEN']
          }
        }).then(() => {
          navigate('/print', {
            state: {
              profileImageDataURL: profileImageDataURL,
              ...state
            }
          })
        })
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
            fixedWidth: '20vw',
            fixedHeight: '30vw',
            gap: '3vw',
            focus: 'center',
            arrows: false,
            pagination: false
          }}>
          {state.imageBase64Set.map((image, index) => (
            <SplideSlide key={index}>
              <Image w="100%" src={'data:image/png;base64,' + image} />
            </SplideSlide>
          ))}
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
