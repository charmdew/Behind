import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout'
import photoShootGuideImageTemp from '../assets/photo-shoot-guide-image-temp.png'

const PhotoShootGuidePage = () => {
  const navigate = useNavigate()

  const keyDownHandler = (e) => {
    // temp start
    if (e.key === 'ArrowLeft') navigate('/menu')
    // temp end
    if (e.key === 'Enter') navigate('/photo-shoot')
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
          가운데 프레임에 맞추어
          <br />
          사진을 촬영해주세요.
        </>
      }
      imageSrc={photoShootGuideImageTemp}
      imageAlt="Photo shoot guide"
      isButton={true}
    />
  )
}

export default PhotoShootGuidePage
