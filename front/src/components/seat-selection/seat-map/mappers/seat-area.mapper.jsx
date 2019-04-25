/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import SeatAreaPopoverContent from '../../popover/content/SeatAreaPopoverContent'
import { areaDimensions } from './commom'
import eventSeatsPricingExample from '../../../../constants/event-seats-pricing.example'

const SeatArea = styled.div`
  background-color: yellow;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`

const seatAreaMapper = ({
  multiplier, setHoveredSeat, setSelectedSeat,
}) => ({
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
}

export default seatAreaMapper
