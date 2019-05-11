import React from 'react'
import PropTypes from 'prop-types'
import { NamespacedResources } from '@async-resource/react-redux'
import { FullLoader } from '../components/load/Loader'

const searchById = id => item => item.id === id

const seatOrigins = ['seatAreas', 'genericAreas', 'numberedSeats']
const findSeatInfo = (eventSeats, seat) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const origin of seatOrigins) {
    const data = eventSeats.data[origin] || []
    const info = data.find(searchById(seat))
    if (info) return { origin, info }
  }
  return {}
}

export default (Component) => {
  /* eslint-disable react/destructuring-assignment */
  const WithEventSeatInfo = props => (
    <NamespacedResources
      ids={['eventInfo', 'eventSeats']}
      namespace={props.event}
      render={({ eventInfo, eventSeats }, state) => {
        if (state.loading) return <FullLoader />
        if (state.loaded) {
          // pricing
          const pricing = eventSeats.data.pricings
            .find(pr => pr.seat === props.seat).pricing
            .map(id => eventInfo.data.pricing.find(pr => pr.id === id))
          // seat info
          const { info, origin } = findSeatInfo(eventSeats, props.seat)

          return (
            <Component
              {...props}
              eventInfo={eventInfo.data}
              seatInfo={info}
              origin={origin}
              pricing={pricing}
            />
          )
        }
        return <div> Error </div>
      }}
    />
  )
  WithEventSeatInfo.propTypes = {
    event: PropTypes.number.isRequired,
    seat: PropTypes.number.isRequired,
  }
  return WithEventSeatInfo
}
