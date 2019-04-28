import React from 'react'
import PropTypes from 'prop-types'
import { NamespacedResource } from '@async-resource/react-redux'
import { Title, PriceContainer, PriceValue, PriceName } from './styles'
import { Loader } from '../../../load/Loader'

// reserve/un-reserve with word click

const NumberedSeatPopoverContent = ({ seat, number }) => (
  <>
    <Title> Seat #{ number } </Title>
    <NamespacedResource
      id="eventSeatsPricing"
      namespace={seat}
      render={(resource) => {
        if (resource.loading) return <Loader />
        if (resource.loaded) {
          const { pricing } = resource.data
          return pricing.map(({ id, name, price }) => (
            <PriceContainer key={id}>
              <PriceValue> ${price.toFixed(2)} </PriceValue>
              <PriceName> - {name} </PriceName>
            </PriceContainer>
          ))
        }
        return <div> Error </div>
      }}
    />
  </>
)

NumberedSeatPopoverContent.propTypes = {
  seat: PropTypes.number.isRequired,
  number: PropTypes.string.isRequired,
}

export default NumberedSeatPopoverContent
