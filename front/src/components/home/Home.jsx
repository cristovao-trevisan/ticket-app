import React from 'react'
import styled from 'styled-components'
import Showcase from './showcase/Showcase'
import Search from './search/Search'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Home = () => (
  <Container>
    <Showcase />
    <Search />
  </Container>
)


export default () => <Home />
