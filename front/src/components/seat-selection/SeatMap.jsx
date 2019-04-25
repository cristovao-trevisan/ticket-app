import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SeatMapPopover from './popover/PopOver'
import eventSeatsPricingExample from '../../constants/event-seats-pricing.example'
import SeatAreaPopoverContent from './popover/content/SeatAreaPopoverContent'
import NumberedSeatPopoverContent from './popover/content/NumberedSeatPopoverContent'

const pointToCoordinate = (point) => {
  const [, x, y] = /\((\d+) ?, ?(\d+)\)/.exec(point)

  return [Number(x), Number(y)]
}

const MAX_WIDTH = 2000
const WIDTH_HEIGHT_RELATION = 16 / 9
const MAX_HEIGHT = MAX_WIDTH / WIDTH_HEIGHT_RELATION
const SEAT_RADIUS = 30

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

const areaDimensions = ({ locationStart, locationEnd, multiplier }) => {
  const [xi, yi] = pointToCoordinate(locationStart)
  const [xf, yf] = pointToCoordinate(locationEnd)
  const left = xi * multiplier
  const top = yi * multiplier
  const width = (xf - xi) * multiplier
  const height = (yf - yi) * multiplier
  return {
    popoverPosition: { top, left: left + width / 2 },
    style: {
      left, top, width, height,
    },
  }
}

const numberedSeatDimensions = ({ location, multiplier }) => {
  const [x, y] = pointToCoordinate(location)
  const radius = SEAT_RADIUS * multiplier
  const left = x * multiplier - radius
  const top = y * multiplier - radius
  const size = radius * 2

  return {
    popoverPosition: { top, left: left + radius },
    style: {
      left, top, width: size, height: size,
    },
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
  const [hoveredSeat, setHoveredSeat] = useState(null)
  const [selectedSeat, setSelectedSeatState] = useState(null)
  const setSelectedSeat = state => (e) => {
    e.stopPropagation()
    setSelectedSeatState(state)
  }
  const popoverSeat = selectedSeat || hoveredSeat

  const { width, height, multiplier } = calculateDimensions(dimensions)
  // this must be set so popover doesn't go over item
  const zIndex = (id) => {
    if (!popoverSeat) return 0
    return popoverSeat.id === id ? 1 : 0
  }

  const FixtureAreas = fixtureAreas.map(({
    id, name, locationStart, locationEnd,
  }) => (
    <FixtureArea
      key={id}
      style={areaDimensions({ locationEnd, locationStart, multiplier }).style}
    >
      { name }
    </FixtureArea>
  ))

  const SeatAreas = seatAreas.map(({
    id, name, locationStart, locationEnd,
  }) => {
    const { style, popoverPosition } = areaDimensions({ locationEnd, locationStart, multiplier })
    const popoverContent = (
      <SeatAreaPopoverContent
        name={name}
        seat={id}
        pricings={eventSeatsPricingExample}
      />
    )
    const popoverInfo = { id, popoverPosition, popoverContent }
    return (
      <SeatArea
        key={id}
        style={style}
        onMouseEnter={() => setHoveredSeat(popoverInfo)}
        onMouseLeave={() => setHoveredSeat(null)}
        onClick={setSelectedSeat(popoverInfo)}
      >
        { name }
      </SeatArea>
    )
  })

  const NumberedSeats = numberedSeats.map(({
    id, number, location, // reserved, occupied,
  }) => {
    const { style, popoverPosition } = numberedSeatDimensions({ location, multiplier })
    const popoverContent = (
      <NumberedSeatPopoverContent
        number={number}
        seat={id}
        pricings={eventSeatsPricingExample}
      />
    )
    const popoverInfo = { id, popoverPosition, popoverContent }
    return (
      <NumberedSeat
        key={id}
        style={{ ...style, zIndex: zIndex(id) }}
        onMouseEnter={() => setHoveredSeat(popoverInfo)}
        onMouseLeave={() => setHoveredSeat(null)}
        onClick={setSelectedSeat(popoverInfo)}
      />
    )
  })

  return (
    <Container
      style={{ width, height }}
      onClick={setSelectedSeat(null)}
    >
      { FixtureAreas }
      { SeatAreas }
      { NumberedSeats }
      {popoverSeat && (
        <SeatMapPopover {...popoverSeat.popoverPosition}>
          { popoverSeat.popoverContent }
        </SeatMapPopover>
      )}
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
