import React from 'react'
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout'

const StartPage = () => {
  const navigate = useNavigate()
  window.addEventListener('keyup',
    () => {
      navigate("/login-guide")
      console.log('1')
    },
    true)

  return (
    <Layout
      heading="StartPage"
      body="body"
      imageSrc="https://bit.ly/dan-abramov"
    />
  )
}

export default StartPage