/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import SeatAreaPopoverContent from '../../popover/content/SeatAreaPopoverContent'
import { areaDimensions } from './commom'
import { blue } from '../../../../constants/colors'

const SeatArea = styled.div`
  background-color: ${blue[1]};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const seatAreaMapper = ({
  multiplier, event, areas,
  setHoveredSeat, setSelectedSeat,
}) => ({
  id, name, locationStart, locationEnd,
}) => {
  const { style, popoverPosition } = areaDimensions({ locationEnd, locationStart, multiplier })
  const area = areas[id] || {}
  const popoverContent = <SeatAreaPopoverContent {...area} name={name} seat={id} event={event} />
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
