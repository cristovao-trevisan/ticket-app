import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import UnLoggedContent from './UnLoggedContent'
import LoggedContent from './LoggedContent'
import { Loader } from '../../load/Loader'
import { signature } from '../../../constants/colors'


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${signature};
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  min-height: 28px;
  padding-top: 16px;
  padding-bottom: 16px;
  color: white;
  font-weight: bold;
`

const Content = () => {
  const login = useSelector(state => state.login)
  if (login.loading) return <Loader />
  if (!login.data) return <UnLoggedContent />
  return <LoggedContent />
}

const LoginInformation = () => (
  <Container>
    <Content />
  </Container>
)

export default LoginInformation
