import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'

import Layout from '../components/Layout'
import ProfileCardPhoto from '../components/ProfileCardPhoto'

const AfterShootPage = ({ imageSrc }) => {
  const navigate = useNavigate()
  const [selection, setSelection] = useState('up')

  const keyDownHandler = (e) => {
    if (e.key === 'ArrowUp') {
      setSelection('down')
      console.log(selection)
    }
    if (e.key === 'ArrowDown') {
      setSelection('down')
      console.log(selection)
    }
    if (e.key === 'Enter') {
      console.log(selection)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  imageHandler(imageSrc)

  const body = (
    <Box>
      <Flex direction="row" align="center" gap="10vw">
        <Flex direction="column" gap="5vh">
          <Box
            px="4vw"
            py="4vh"
            color={selection === 'up' ? 'white' : 'black'}
            bgColor={selection === 'up' ? 'teal' : 'gray'}
            fontSize="4vw"
            borderRadius="lg">
            다음
          </Box>
          <Box
            px="4vw"
            py="4vh"
            color={selection === 'down' ? 'white' : 'black'}
            bgColor={selection === 'down' ? 'teal' : 'gray'}
            fontSize="4vw"
            borderRadius="lg">
            다시 찍기
          </Box>
        </Flex>
        <Box w="40vw">
          <ProfileCardPhoto imageSrc={imageSrc} />
        </Box>
      </Flex>
    </Box>
  )

  return <Layout heading="프로필 사진" body={body} />
}

const imageHandler = (imageSrc) => {
  let img = new Image()
  img.src = imageSrc
  let width = img.width
  let height = img.height
  console.log(imageSrc)
  console.log(width, height)
}

function cropImage(
  imgUri,
  width = 400,
  height = 300,
  xstart = 0,
  ystart = 0,
  callback
) {
  try {
    console.log('Values in crop', width, height)
    let resize_canvas = document.createElement('canvas')
    let orig_src = new Image()
    orig_src.src = imgUri
    orig_src.onload = function () {
      resize_canvas.width = width
      resize_canvas.height = height
      let cnv = resize_canvas.getContext('2d')
      cnv.drawImage(
        orig_src,
        xstart,
        ystart,
        width,
        height,
        0,
        0,
        width,
        height
      )
      let newimgUri = resize_canvas.toDataURL('image/png').toString()
      callback(newimgUri)
    }
  } catch (e) {
    console.log("Couldn't crop image due to", e)
    window.alert("Couldn't crop image due to", e)
    callback(imgUri)
  }
}

export default AfterShootPage
