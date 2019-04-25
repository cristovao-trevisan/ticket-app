import React from 'react'
import PropTypes from 'prop-types'
import contentPropTypes from './prop-types'
import { Title, PriceContainer, PriceValue, PriceName } from './styles'

const SeatAreaPopoverContent = ({ seat, pricings, name }) => {
  const { pricing } = pricings.find(p => p.seat === seat)

  return (
    <>
      <Title> { name } </Title>
      {pricing.map(({ id, name: priceName, price }) => (
        <PriceContainer key={id}>
          <PriceValue> ${price.toFixed(2)} </PriceValue>
          <PriceName> - {priceName} </PriceName>
        </PriceContainer>
      ))}
    </>
  )
}

SeatAreaPopoverContent.propTypes = {
  ...contentPropTypes,
  name: PropTypes.string.isRequired,
}

export default SeatAreaPopoverContent
