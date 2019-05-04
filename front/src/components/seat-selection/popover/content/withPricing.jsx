import React from 'react'
import PropTypes from 'prop-types'
import { NamespacedResources } from '@async-resource/react-redux'
import { Loader } from '../../../load/Loader'


export default (Component) => {
  /* eslint-disable react/destructuring-assignment */
  const WithPricing = props => (
    <NamespacedResources
      ids={['eventInfo', 'eventSeats']}
      namespace={props.event}
      render={({ eventInfo, eventSeats }, state) => {
        if (state.loading) return <Loader />
        if (state.loaded) {
          const pricing = eventSeats.data.pricings
            .find(pr => pr.seat === props.seat)
            .pricing.map(id => eventInfo.data.pricing.find(pr => pr.id === id))

          return <Component {...props} pricing={pricing} />
        }
        return <div> Error </div>
      }}
    />
  )
  WithPricing.propTypes = {
    event: PropTypes.number.isRequired,
    seat: PropTypes.number.isRequired,
  }
  return WithPricing
}
