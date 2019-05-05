import React from 'react'
import PropTypes from 'prop-types'

import { Title, PriceContainer, PriceValue, PriceName } from './styles'
import withPricing from './withPricing'

// Reserve seat by word click, remove all with x at right

const SeatAreaPopoverContent = ({ name, pricing }) => (
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

SeatAreaPopoverContent.propTypes = {
  name: PropTypes.string.isRequired,
  pricing: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
}

export default withPricing(SeatAreaPopoverContent)
