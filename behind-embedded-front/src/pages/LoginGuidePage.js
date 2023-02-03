import React from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout'
import qrQuideImageTemp from '../assets/qr-guide-image-temp.jpg'

const LoginGuidePage = () => {
  const navigate = useNavigate()

  window.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Enter') navigate('/login-qr-scan')
    },
    true
  )

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
      imageSrc={qrQuideImageTemp}
      imageAlt="QR Guide"
    />
  )
}

export default LoginGuidePage
