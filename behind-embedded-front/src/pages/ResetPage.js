import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Center, Flex } from '@chakra-ui/react'
import { GiButtonFinger } from 'react-icons/gi'

import Container from '../components/Container'
import Header from '../components/Header'
import ButtonLg from '../components/ButtonLg'
import IconWithLabel from '../components/IconWithLabel'

const ResetPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [selection, setSelection] = useState('left')

  const keyDownHandler = (e) => {
    if (e.key === 'ArrowLeft') setSelection('left')
    if (e.key === 'ArrowRight') setSelection('right')
    if (e.key === 'Enter') {
      if (selection === 'left') {
        const { prevPage, ...newState } = state
        navigate(state.prevPage, { state: newState })
      }
      if (selection === 'right') navigate('/')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [selection])

  return (
    <Center w="100vw" h="100vh">
      <Container>
        <Header>첫 화면 이동</Header>
        <Flex as="main" direction="row" justify="center" gap="5vw" my="8vw">
          <ButtonLg isSelected={selection === 'left'}>취소</ButtonLg>
          <ButtonLg isSelected={selection === 'right'}>확인</ButtonLg>
        </Flex>
        <Flex direction="row" justify="end" gap="2vw">
          <IconWithLabel icon={GiButtonFinger} label="선택" />
        </Flex>
      </Container>
    </Center>
  )
}

export default ResetPage
