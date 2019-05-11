import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useActions } from 'react-redux'

import { Title, PriceContainer, PriceValue, PriceName } from './styles'
import withEventSeatInfo from '../../../../hoc/with-event-seat-info'
import { occupied as occupiedColor } from '../../../../constants/colors'
import { addSeatToCart as addSeatToCartAction } from '../../../../actions/thunk-actions'

const SeatAreaSoldOut = styled.div`
  color: ${occupiedColor};
`
const SeatAreaAllReserved = styled.div`
  text-align: center;
  font-size: 12px;
  margin-bottom: 4px;
  margin-top: -4px;
  color: ${occupiedColor};
`

const SeatAreaPopoverContent = ({
  name, pricing, occupied, reserved,
  event, seat,
  seatInfo: { capacity },
}) => {
  const addSeatToCart = useActions(s => addSeatToCartAction(s, 'seatAreas'))

  if (occupied >= capacity) return <SeatAreaSoldOut> SOLD OUT </SeatAreaSoldOut>
  const allReserved = (occupied + reserved >= capacity)
  return (
    <>
      <Title> { name } </Title>
      {allReserved && <SeatAreaAllReserved as="div"> All seats here are reserved, try again later </SeatAreaAllReserved>}
      {pricing.map(({ id, name: priceName, price }) => (
        <PriceContainer
          key={id}
          disabled={allReserved}
          onClick={() => addSeatToCart({ price: id, seat, event, amount: 1 })}
        >
          <PriceValue> ${price.toFixed(2)} </PriceValue>
          <PriceName> - {priceName} </PriceName>
        </PriceContainer>
      ))}
    </>
  )
}

SeatAreaPopoverContent.propTypes = {
  name: PropTypes.string.isRequired,
  seat: PropTypes.number.isRequired,
  event: PropTypes.number.isRequired,
  pricing: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  occupied: PropTypes.number,
  reserved: PropTypes.number,
  seatInfo: PropTypes.shape({
    capacity: PropTypes.number.isRequired,
  }).isRequired,
}
SeatAreaPopoverContent.defaultProps = {
  occupied: 0,
  reserved: 0,
}

export default withEventSeatInfo(SeatAreaPopoverContent)
