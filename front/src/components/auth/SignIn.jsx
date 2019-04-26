import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { auth } from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import shadows from '../../styles/shadows'

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

const SignIn = ({ redirect, redirectUrl, children }) => {
  const redirectConfig = redirect
    ? { signInSuccessUrl: redirectUrl }
    : { callbacks: { signInSuccess: () => null } }
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
}
SignIn.defaultProps = {
  children: null,
  redirect: false,
  redirectUrl: '/',
}

export default SignIn
