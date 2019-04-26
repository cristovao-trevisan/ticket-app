import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UnLoggedContent = () => (
  <>
    <Link to="/signin" />
  </>
)

const LoginInformation = () => {
  const login = useSelector(state => state.login)
  if (!login) return <UnLoggedContent />
  return (
    <div />
  )
}

export default LoginInformation
