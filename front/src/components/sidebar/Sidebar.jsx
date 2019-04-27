import React from 'react'
import styled from 'styled-components'
import LoginInformation from './login-information/LoginInformation'
import Router from './routes/Router'

const Container = styled.div`
  background-color: white;
  min-width: 250px;
  height: 100%;
`

const Sidebar = () => (
  <Container>
    <LoginInformation />
    <Router />
  </Container>
)


export default Sidebar
