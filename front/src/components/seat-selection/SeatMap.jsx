import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const pointToCoordinate = (point) => {
  const [, x, y] = /\((\d+) ?, ?(\d+)\)/.exec(point)

  return [Number(x), Number(y)]
}

const MAX_WIDTH = 2000
const WIDTH_HEIGHT_RELATION = 16 / 9
const MAX_HEIGHT = MAX_WIDTH / WIDTH_HEIGHT_RELATION
const SEAT_RADIUS = 20

const calculateDimensions = (windowDimensions) => {
  const maxWidth = windowDimensions.width * 0.8
  const maxHeight = windowDimensions.height * 0.8
  const widthRelation = maxWidth / MAX_WIDTH
  const heightRelation = maxHeight / MAX_HEIGHT
  if (heightRelation > widthRelation) {
    const width = Math.min(maxWidth, MAX_WIDTH)
    const multiplier = width / MAX_WIDTH
    const height = width / WIDTH_HEIGHT_RELATION

    return { width, height, multiplier }
  }
  const height = Math.min(maxHeight, MAX_HEIGHT)
  const width = height * WIDTH_HEIGHT_RELATION
  const multiplier = height / MAX_HEIGHT
  return { width, height, multiplier }
}

const areaDimensionsStyle = ({ locationStart, locationEnd, multiplier }) => {
  const [xi, yi] = pointToCoordinate(locationStart)
  const [xf, yf] = pointToCoordinate(locationEnd)
  const left = xi * multiplier
  const top = yi * multiplier
  const width = (xf - xi) * multiplier
  const height = (yf - yi) * multiplier
  return {
    left, top, width, height,
  }
}

const numberedSeatDimensionsStyle = ({ location, multiplier }) => {
  const [x, y] = pointToCoordinate(location)
  const radius = SEAT_RADIUS * multiplier
  const left = x * multiplier - radius
  const top = y * multiplier - radius
  const size = radius * 2
  return {
    left, top, width: size, height: size,
  }
}

const Container = styled.div`
  border: 1px solid black;
  position: relative;
`
const FixtureArea = styled.div`
  background-color: yellow;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`
const SeatArea = styled.div`
  background-color: yellow;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`
const NumberedSeat = styled.div`
  background-color: green;
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const SeatMap = ({ fixtureAreas, seatAreas, numberedSeats }) => {
  const dimensions = useSelector(state => state.dimensions)
  const { width, height, multiplier } = calculateDimensions(dimensions)

  const FixtureAreas = fixtureAreas.map(({
    id, name, locationStart, locationEnd,
  }) => (
    <FixtureArea
      key={id}
      style={areaDimensionsStyle({ locationEnd, locationStart, multiplier })}
    >
      { name }
    </FixtureArea>
  ))

  const SeatAreas = seatAreas.map(({
    id, name, locationStart, locationEnd,
  }) => (
    <SeatArea
      key={id}
      style={areaDimensionsStyle({ locationEnd, locationStart, multiplier })}
    >
      { name }
    </SeatArea>
  ))

  const NumberedSeats = numberedSeats.map(({
    id, number, location, reserved, occupied,
  }) => (
    <NumberedSeat
      key={id}
      style={numberedSeatDimensionsStyle({ location, multiplier })}
    />
  ))

  return (
    <Container style={{ width, height }}>
      { FixtureAreas }
      { SeatAreas }
      { NumberedSeats }
    </Container>
  )
}

SeatMap.propTypes = {
  fixtureAreas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    locationStart: PropTypes.string.isRequired,
    locationEnd: PropTypes.string.isRequired,
  })),
  seatAreas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    locationStart: PropTypes.string.isRequired,
    locationEnd: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    reserved: PropTypes.number.isRequired,
    occupied: PropTypes.number.isRequired,
  })),
  numberedSeats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.string,
    location: PropTypes.string.isRequired,
    reserved: PropTypes.bool.isRequired,
    occupied: PropTypes.bool.isRequired,
  })),
}
SeatMap.defaultProps = {
  fixtureAreas: [],
  seatAreas: [],
  numberedSeats: [],
}

export default SeatMap
