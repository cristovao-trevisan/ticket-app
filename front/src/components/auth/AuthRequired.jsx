import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import SignIn from './SignIn'

const AuthRequired = ({ children }) => {
  const login = useSelector(state => state.login)
  if (login) return children

  return (
    <div>
      This page requires authentication
      <SignIn />
    </div>
  )
}

AuthRequired.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthRequired
