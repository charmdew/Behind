import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout'
import qrGuideImageTemp from '../assets/qr-guide-image-temp.jpg'

const LoginGuidePage = () => {
  const navigate = useNavigate()

  const keyDownHandler = (e) => {
    // temp start
    if (e.key === 'ArrowLeft') navigate('/')
    // temp end
    if (e.key === 'Enter') navigate('/login-qr-scan')
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  return (
    <Layout
      heading="로그인"
      body={
        <>
          다음과 같이
          <br />
          홈페이지 오른쪽 상단의
          <br />
          QR 코드를
          <br />
          카메라 정중앙에
          <br />
          위치시켜주세요.
        </>
      }
      imageSrc={qrGuideImageTemp}
      imageAlt="QR guide"
      isButton={true}
    />
  )
}

export default LoginGuidePage
