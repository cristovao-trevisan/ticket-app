import React from 'react'
import PropTypes from 'prop-types'
import contentPropTypes from './prop-types'
import { Title, PriceContainer, PriceValue, PriceName } from './styles'


const NumberedSeatPopoverContent = ({ seat, pricings, number }) => {
  const { pricing } = pricings.find(p => p.seat === seat)

  return (
    <>
      <Title> Seat #{ number } </Title>
      {pricing.map(({ id, name, price }) => (
        <PriceContainer key={id}>
          <PriceValue> ${price.toFixed(2)} </PriceValue>
          <PriceName> - {name} </PriceName>
        </PriceContainer>
      ))}
    </>
  )
}

NumberedSeatPopoverContent.propTypes = {
  ...contentPropTypes,
  number: PropTypes.string.isRequired,
}

export default NumberedSeatPopoverContent
