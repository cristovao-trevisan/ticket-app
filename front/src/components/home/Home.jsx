import React from 'react'
import styled from 'styled-components'
import Showcase from './showcase/Showcase'

const Container = styled.div`
`

const Home = () => (
  <Container>
    <Showcase />
  </Container>
)


export default () => <Home />
