/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import NumberedSeatPopoverContent from '../../popover/content/NumberedSeatPopoverContent'
import { pointToCoordinate } from './commom'

const SEAT_RADIUS = 30

const NumberedSeat = styled.div`
  background-color: green;
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
`
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


const numberedSeatMapper = ({
  multiplier, setHoveredSeat, setSelectedSeat, popoverSeat,
}) => ({
  id, number, location,
}) => {
  // z-index must be set so popover doesn't go over item
  const zIndex = (!popoverSeat || popoverSeat.id !== id) ? 0 : 1
  const { style, popoverPosition } = numberedSeatDimensions({ location, multiplier })
  const popoverContent = <NumberedSeatPopoverContent number={number} seat={id} />
  const popoverInfo = { id, popoverPosition, popoverContent }

  return (
    <NumberedSeat
      key={id}
      style={{ ...style, zIndex }}
      onMouseEnter={() => setHoveredSeat(popoverInfo)}
      onMouseLeave={() => setHoveredSeat(null)}
      onClick={setSelectedSeat(popoverInfo)}
    />
  )
}

export default numberedSeatMapper
