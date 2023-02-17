// Temp start
// Incomplete PhotoSelectFromServer.js
// Comments below are all related to the above issue
// Temp end

import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Center, Flex } from '@chakra-ui/react'
import { FaArrowsAltH, FaArrowUp } from 'react-icons/fa'
import { GiButtonFinger } from 'react-icons/gi'

import Container from '../components/Container'
import Header from '../components/Header'
import ButtonLg from '../components/ButtonLg'
import IconWithLabel from '../components/IconWithLabel'

const MenuPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [selection, setSelection] = useState('left')

  const keyDownHandler = (e) => {
    if (e.key === 'ArrowUp')
      navigate('/reset', { state: { prevPage: '/menu', ...state } })
    if (e.key === 'ArrowLeft') setSelection('left')
    // if (e.key === 'ArrowRight') setSelection('right')
    if (e.key === 'Enter') {
      if (selection === 'left') navigate('/photo-shoot-guide', { state: state })
      // if (selection === 'right')
      //   navigate('/photo-get-and-select', { state: state })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [selection])

  return (
    <Center w="100vw" h="100vh">
      <Container>
        <Header>메뉴</Header>
        <Flex as="main" direction="row" justify="center" gap="5vw" my="8vw">
          <ButtonLg isSelected={selection === 'left'}>사진 촬영</ButtonLg>
          {/* <ButtonLg isSelected={selection === 'right'}>카드 출력</ButtonLg> */}
        </Flex>
        <Flex direction="row" justify="end" gap="2vw">
          <IconWithLabel icon={FaArrowUp} label="첫 화면" />
          {/* <IconWithLabel icon={FaArrowsAltH} label="이동" /> */}
          <IconWithLabel icon={GiButtonFinger} label="선택" />
        </Flex>
      </Container>
    </Center>
  )
}

export default MenuPage
