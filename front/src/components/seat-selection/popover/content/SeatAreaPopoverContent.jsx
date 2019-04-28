import React from 'react'
import PropTypes from 'prop-types'
import { NamespacedResource } from '@async-resource/react-redux'

import { Title, PriceContainer, PriceValue, PriceName } from './styles'
import { Loader } from '../../../load/Loader'

// Reserve seat by word click, remove all with x at right

const SeatAreaPopoverContent = ({ seat, name }) => (
  <>
    <Title> { name } </Title>
    <NamespacedResource
      id="eventSeatsPricing"
      namespace={seat}
      render={(resource) => {
        if (resource.loading) return <Loader />
        if (resource.loaded) {
          const { pricing } = resource.data
          return pricing.map(({ id, name: priceName, price }) => (
            <PriceContainer key={id}>
              <PriceValue> ${price.toFixed(2)} </PriceValue>
              <PriceName> - {priceName} </PriceName>
            </PriceContainer>
          ))
        }
        return <div> Error </div>
      }}
    />
  </>
)

SeatAreaPopoverContent.propTypes = {
  seat: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}

export default SeatAreaPopoverContent
