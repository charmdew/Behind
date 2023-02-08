import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'

import Layout from '../components/Layout'

const MenuSelectPage = () => {
  const navigate = useNavigate()
  const [selection, setSelection] = useState('left')

  const keyDownHandler = (e) => {
    if (e.key === 'ArrowLeft') setSelection('left')
    if (e.key === 'ArrowRight') setSelection('right')
    if (e.key === 'Enter' && selection === 'left')
      navigate('/photo-shoot-guide')
    if (e.key === 'Enter' && selection === 'right') navigate('/photo-select')
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [selection])

  const body = (
    <Flex direction="row" gap="5vw">
      <Box
        px="5vw"
        py="5vh"
        color={selection === 'left' ? 'white' : 'black'}
        bgColor={selection === 'left' ? 'teal' : 'gray'}
        fontSize="4vw"
        borderRadius="lg">
        사진 촬영
      </Box>
      <Box
        px="5vw"
        py="5vh"
        color={selection === 'right' ? 'white' : 'black'}
        bgColor={selection === 'right' ? 'teal' : 'gray'}
        fontSize="4vw"
        borderRadius="lg">
        카드 출력
      </Box>
    </Flex>
  )

  return <Layout heading="로그인" body={body} />
}

export default MenuSelectPage
