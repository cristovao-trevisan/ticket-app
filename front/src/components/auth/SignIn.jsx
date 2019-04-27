import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { auth } from 'firebase/app'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import shadows from '../../styles/shadows'
import { FullLoader } from '../load/Loader'

const Container = styled.div`
  ${shadows[1]}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  margin-top: 16px; 
  margin-bottom: 16px;
  border-radius: 4px;
`
const SignInText = styled.div`
  font-size: 24px;
`

const uiConfig = {
  signInFlow: 'popup',
  callbacks: { signInSuccess: () => null },
  signInOptions: [
    auth.GoogleAuthProvider.PROVIDER_ID,
    auth.FacebookAuthProvider.PROVIDER_ID,
    auth.EmailAuthProvider.PROVIDER_ID,
  ],
}

const SignIn = ({ redirect, redirectUrl, children, location }) => {
  const login = useSelector(state => state.login)
  if (login.loading) return <FullLoader />
  if (login.data && location.pathname === '/signin') return <Redirect to="/" />
  const redirectConfig = redirect
    ? { signInSuccessUrl: redirectUrl }
    : { callbacks: { signInSuccessWithAuthResult: () => null } }
  const config = {
    ...uiConfig,
    ...redirectConfig,
  }
  return (
    <Container>
      { children }
      <SignInText>Sign In</SignInText>
      <StyledFirebaseAuth uiConfig={config} firebaseAuth={auth()} />
    </Container>
  )
}

SignIn.propTypes = {
  children: PropTypes.node,
  redirect: PropTypes.bool,
  redirectUrl: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}
SignIn.defaultProps = {
  children: null,
  redirect: false,
  redirectUrl: '/',
}

export default SignIn
