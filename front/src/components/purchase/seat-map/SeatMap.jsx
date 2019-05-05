import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SeatMapPopover from '../popover/PopOver'
import seatAreaMapper from './mappers/seat-area.mapper'
import fixtureAreaMapper from './mappers/fixture-area.mapper'
import numberedSeatMapper from './mappers/numbered-seat.mapper'

const MAX_WIDTH = 2000
const WIDTH_HEIGHT_RELATION = 16 / 9
const MAX_HEIGHT = MAX_WIDTH / WIDTH_HEIGHT_RELATION

const calculateDimensions = (windowDimensions) => {
  // max of 80% of each dimension
  const maxWidth = windowDimensions.width * 0.8
  const maxHeight = windowDimensions.height * 0.8
  // relative dimensions to aimed resolution (16 / 9)
  const widthRelation = maxWidth / MAX_WIDTH
  const heightRelation = maxHeight / MAX_HEIGHT
  // check which dimension is smaller in relation to the resolution
  // and use it as the limiter
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

const Container = styled.div`
  border: 1px solid black;
  position: relative;
`

// Main component
const SeatMap = ({ fixtureAreas, seatAreas, numberedSeats, event }) => {
  // state and redux variables
  const dimensions = useSelector(state => state.dimensions)
  const [hoveredSeat, setHoveredSeat] = useState(null)
  const [selectedSeat, setSelectedSeatState] = useState(null) // clicked seat
  const setSelectedSeat = state => (e) => {
    e.stopPropagation()
    setSelectedSeatState(state)
  }
  const popoverSeat = selectedSeat || hoveredSeat

  // calculate responsive dimensions
  const { width, height, multiplier } = calculateDimensions(dimensions)

  // generate items
  const mappingData = { multiplier, setHoveredSeat, setSelectedSeat, popoverSeat, event }
  const FixtureAreas = fixtureAreas.map(fixtureAreaMapper({ multiplier }))
  const SeatAreas = seatAreas.map(seatAreaMapper(mappingData))
  const NumberedSeats = numberedSeats.map(numberedSeatMapper(mappingData))

  return (
    <Container
      style={{ width, height }}
      onClick={setSelectedSeat(null)}
    >
      { FixtureAreas }
      { SeatAreas }
      { NumberedSeats }
      { popoverSeat && (
        <SeatMapPopover {...popoverSeat.popoverPosition}>
          { popoverSeat.popoverContent }
        </SeatMapPopover>
      )}
    </Container>
  )
}

SeatMap.propTypes = {
  event: PropTypes.number.isRequired,
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
