const os = require('node:os')
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Center, Flex, Box } from '@chakra-ui/react'
import { FaArrowLeft, FaArrowsAltV } from 'react-icons/fa'
import { GiButtonFinger } from 'react-icons/gi'
import jwt_decode from 'jwt-decode'

import Container from '../components/Container'
import Header from '../components/Header'
import ButtonLg from '../components/ButtonLg'
import IconWithLabel from '../components/IconWithLabel'
import ProfileCard from '../components/ProfileCard'
import saveElToImage from '../utils/saveElToImage.js'

const PrintPage = ({ socketClient, urls }) => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [selection, setSelection] = useState(1)
  const [userInfo, setUserInfo] = useState({})

  const keyDownHandler = (e) => {
    if (e.key === 'ArrowLeft')
      navigate('/reset', { state: { prevPage: '/print', ...state } })
    if (e.key === 'ArrowDown') {
      if (selection < 3) setSelection(selection + 1)
    }
    if (e.key === 'ArrowUp') {
      if (selection > 1) setSelection(selection - 1)
    }
    if (e.key === 'Enter') {
      if (selection === 1) {
        const downloadPath = os.homedir() + '/image.png'
        saveElToImage('profile-card', downloadPath, () => {
          socketClient.send('print')
          navigate('/end')
        })
      }
      if (selection === 2) {
        const { profileImageDataURL, ...newState } = state
        navigate('/photo-select', { state: newState })
      }
      if (selection === 3) {
        getUserInfo()
      }
    }
  }

  const getUserInfo = async () => {
    const id = jwt_decode(state['X-AUTH-TOKEN']).sub
    const userInfoURL = urls.userInfoURL + '/' + id
    const res = await fetch(userInfoURL, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': state['X-AUTH-TOKEN']
      }
    })
    const body = await res.json()
    const { name, tag, email, phoneNum } = body
    const tagString = tag.join(' ')
    const userInfo = { name, tagString, email, phoneNum }
    setUserInfo(userInfo)
  }

  useEffect(() => {
    const body = document.querySelector('body')
    body.style.overflow = 'hidden'
  })

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [selection])

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <>
      <Center w="100vw" h="100vh">
        <Container>
          <Header>출력</Header>
          <Flex as="main" direction="row" justify="center" gap="5vw">
            <Flex direction="column" justify="center" gap="2vw">
              <ButtonLg isSelected={selection === 1}>출력하기</ButtonLg>
              <ButtonLg isSelected={selection === 2}>다시 고르기</ButtonLg>
              <ButtonLg isSelected={selection === 3}>정보 갱신</ButtonLg>
            </Flex>
            <ProfileCard
              id="profile-card-scaled"
              name={userInfo.name}
              tagString={userInfo.tagString}
              email={userInfo.email}
              phoneNum={userInfo.phoneNum}
              src={state.profileImageDataURL}
              width={320}
            />
          </Flex>
          <Flex direction="row" justify="end" gap="2vw">
            <IconWithLabel icon={FaArrowLeft} label="첫 화면" />
            <IconWithLabel icon={FaArrowsAltV} label="이동" />
            <IconWithLabel icon={GiButtonFinger} label="선택" />
          </Flex>
        </Container>
      </Center>
      <Box>
        <ProfileCard
          id="profile-card"
          name={userInfo.name}
          tagString={userInfo.tagString}
          email={userInfo.email}
          phoneNum={userInfo.phoneNum}
          src={state.profileImageDataURL}
          width={640}
        />
      </Box>
    </>
  )
}

export default PrintPage
