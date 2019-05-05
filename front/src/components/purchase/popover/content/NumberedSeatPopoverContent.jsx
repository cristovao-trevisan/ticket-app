import React from 'react'
import PropTypes from 'prop-types'
import { Title, PriceContainer, PriceValue, PriceName } from './styles'
import withPricing from './withPricing'

// reserve/un-reserve with word click

const NumberedSeatPopoverContent = ({ number, pricing }) => (
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

NumberedSeatPopoverContent.propTypes = {
  number: PropTypes.string.isRequired,
  pricing: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
}

export default withPricing(NumberedSeatPopoverContent)
