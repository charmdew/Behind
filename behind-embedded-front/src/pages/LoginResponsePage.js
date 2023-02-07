import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit'

import Layout from '../components/Layout'

const LoginResponsePage = () => {
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  const keyDownHandler = (e) => {
    // temp start
    if (e.key === 'ArrowLeft') navigate('/login-qr-scan')
    // temp end
    if (e.key === 'Enter' && isAuthenticated()) navigate('/menu')
    if (e.key === 'Enter' && !isAuthenticated()) navigate('/login-qr-scan')
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  const body = isAuthenticated()
    ? '로그인에 성공했습니다!'
    : '다시 시도해주세요.'

  return <Layout heading="로그인" body={body} isButton={true} />
}

export default LoginResponsePage
