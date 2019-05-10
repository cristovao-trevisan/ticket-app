import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NamespacedResources } from '@async-resource/react-redux'
import { withRouter } from 'react-router-dom'

import AuthRequired from '../auth/AuthRequired'
import SeatMap from './seat-map/SeatMap'
import { FullLoader } from '../load/Loader'
import SeatMapConvention from './seat-map-convention/SeatMapConvention'
import useEventStateEffect from '../../hooks/use-event-state-effect'

const SeatSelection = ({ match }) => {
  const event = Number(match.params.event)
  const [reservations, setReservations] = useState({})
  const [purchases, setPurchases] = useState({})
  const [prices, setPrices] = useState({})
  useEventStateEffect(event, { setReservations, setPurchases, setPrices })

  return (
    <AuthRequired>
      <NamespacedResources
        ids={['eventInfo', 'eventSeats']}
        namespace={event}
        render={({ eventSeats }, state) => {
          if (state.loading) return <FullLoader />
          if (state.loaded) {
            return (
              <SeatMap
                event={event}
                fixtureAreas={eventSeats.data.fixtureAreas}
                numberedSeats={eventSeats.data.numberedSeats}
                seatAreas={eventSeats.data.seatAreas}
                reservations={reservations}
                purchases={purchases}
                prices={prices}
              />
            )
          }

          return <div> Error </div>
        }}
      />
      <SeatMapConvention />
    </AuthRequired>
  )
}
SeatSelection.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      event: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default withRouter(SeatSelection)
