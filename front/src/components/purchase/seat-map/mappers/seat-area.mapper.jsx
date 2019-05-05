/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import SeatAreaPopoverContent from '../../popover/content/SeatAreaPopoverContent'
import { areaDimensions } from './commom'

const SeatArea = styled.div`
  background-color: yellow;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const seatAreaMapper = ({
  multiplier, setHoveredSeat, setSelectedSeat, event,
}) => ({
  id, name, locationStart, locationEnd,
}) => {
  const { style, popoverPosition } = areaDimensions({ locationEnd, locationStart, multiplier })
  const popoverContent = <SeatAreaPopoverContent name={name} seat={id} event={event} />
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
