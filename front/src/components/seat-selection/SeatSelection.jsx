import React from 'react'
import PropTypes from 'prop-types'
import { NamespacedResources } from '@async-resource/react-redux'
import AuthRequired from '../auth/AuthRequired'
import SeatMap from './seat-map/SeatMap'
import { FullLoader } from '../load/Loader'

const SeatSelection = ({ event }) => (
  <AuthRequired>
    <NamespacedResources
      ids={['eventInfo', 'eventSeats']}
      namespace={event}
      render={({ eventSeats }, state) => {
        if (state.loading) return <FullLoader />
        if (state.loaded) {
          return (
            <SeatMap
              fixtureAreas={eventSeats.data.fixtureAreas}
              numberedSeats={eventSeats.data.numberedSeats}
              seatAreas={eventSeats.data.seatAreas}
            />
          )
        }

        return <div> Error </div>
      }}
    />
  </AuthRequired>
)
SeatSelection.propTypes = {
  event: PropTypes.number,
}
SeatSelection.defaultProps = {
  event: 1,
}

export default SeatSelection
