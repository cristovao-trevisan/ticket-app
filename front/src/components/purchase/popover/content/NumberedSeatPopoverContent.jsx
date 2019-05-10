import React from 'react'
import PropTypes from 'prop-types'
import { useActions, useSelector } from 'react-redux'
import { MdClear } from 'react-icons/md'

import withEventSeatInfo from '../../../../hoc/with-event-seat-info'
import { Title, PriceContainer, PriceValue, PriceName, NotAvailable, UnReserveButton } from './styles'
import {
  addSeatToCart as addSeatToCartAction,
  removeSeatFromCart as removeSeatFromCartAction,
} from '../../../../actions/thunk-actions'

// reserve/un-reserve with word click
const NumberedSeatPopoverContent = ({
  seatInfo: { number, id: seat },
  eventInfo: { id: event },
  pricing, reservation, purchase,
  price: selectedPrice,
}) => {
  // redux
  const addSeatToCart = useActions(s => addSeatToCartAction(s, 'numberedSeat'))
  const removeSeatFromCart = useActions(s => removeSeatFromCartAction(s, 'numberedSeat'))
  const uid = useSelector(state => state.login.data.uid)
  // computed
  const isOwner = reservation === uid || purchase === uid
  const disabled = !!purchase || !!reservation
  const selectedPricing = pricing.find(pr => pr.id === selectedPrice)

  const PriceList = pricing.map(({ id, name, price }) => (
    <PriceContainer
      key={id}
      onClick={() => addSeatToCart({ event, seat, price: id })}
      disabled={disabled}
    >
      <PriceValue> ${price.toFixed(2)} </PriceValue>
      <PriceName size={12}> - {name} </PriceName>
    </PriceContainer>
  ))
  const UnReserve = (
    <UnReserveButton size={12} onClick={() => removeSeatFromCart({ event, seat })}>
      <MdClear /> { selectedPricing && selectedPricing.name }
    </UnReserveButton>
  )
  return (
    <>
      <Title>
        Seat #{ number }
        {purchase
          ? <NotAvailable> &nbsp;&nbsp; Occupied </NotAvailable>
          : reservation && !isOwner && <NotAvailable> &nbsp;&nbsp; Reserved </NotAvailable>
        }
      </Title>
      { (reservation && isOwner) ? UnReserve : PriceList }
    </>
  )
}

NumberedSeatPopoverContent.propTypes = {
  reservation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  purchase: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  eventInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  seatInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  pricing: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
}
NumberedSeatPopoverContent.defaultProps = {
  reservation: false,
  purchase: false,
  price: false,
}

export default withEventSeatInfo(NumberedSeatPopoverContent)
