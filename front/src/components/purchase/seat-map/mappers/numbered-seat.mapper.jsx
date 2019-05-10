/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import NumberedSeatPopoverContent from '../../popover/content/NumberedSeatPopoverContent'
import { pointToCoordinate } from './commom'
import { vacant, selected, reserved, occupied } from '../../../../constants/colors'

const SEAT_RADIUS = 30

const NumberedSeat = styled.div`
  z-index: ${props => props.zIndex};
  background-color: ${props => props.color};
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

const getColor = (reservation, purchase, uid) => {
  if (purchase) return occupied
  switch (reservation) {
    case undefined:
    case null:
    case false:
      return vacant
    case uid: return selected
    default: return reserved
  }
}

const numberedSeatMapper = ({
  multiplier, popoverSeat, event,
  reservations, purchases, prices,
  setHoveredSeat, setSelectedSeat,
}) => ({
  id, number, location,
}) => {
  const uid = useSelector(state => state.login.data.uid)
  // z-index must be set so popover doesn't go over item
  const zIndex = (!popoverSeat || popoverSeat.id !== id) ? 0 : 1
  const { style, popoverPosition } = numberedSeatDimensions({ location, multiplier })
  const reservation = reservations[id]
  const purchase = purchases[id]

  const popoverContent = (
    <NumberedSeatPopoverContent
      number={number}
      seat={id}
      event={event}
      reservation={reservation}
      purchase={purchase}
      price={prices[id]}
    />
  )
  const popoverInfo = { id, popoverPosition, popoverContent }

  return (
    <NumberedSeat
      key={id}
      zIndex={zIndex}
      color={getColor(reservation, purchase, uid)}
      style={style}
      onMouseEnter={() => setHoveredSeat(popoverInfo)}
      onMouseLeave={() => setHoveredSeat(null)}
      onClick={setSelectedSeat(popoverInfo)}
    />
  )
}

export default numberedSeatMapper
