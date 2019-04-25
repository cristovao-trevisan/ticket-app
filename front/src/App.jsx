import React from 'react'
import styled from 'styled-components'
import SeatMap from './components/seat-selection/seat-map/SeatMap'
import eventSeatsExample from './constants/event-seats.example'

const Title = styled.div`
  font-size: 24px;
  padding: 8px;
  margin-bottom: 80px;
  font-weight: bold;
  border-bottom: 1px solid black;
  text-align: center;
  width: 100%;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const App = () => (
  <Container>
    <Title> Ticket App </Title>
    <SeatMap {...eventSeatsExample} />
  </Container>
)

export default App
