import React from 'react'
import PropTypes from 'prop-types'
import { NamespacedResources } from '@async-resource/react-redux'
import { withRouter } from 'react-router-dom'

import AuthRequired from '../auth/AuthRequired'
import SeatMap from './seat-map/SeatMap'
import { FullLoader } from '../load/Loader'

const SeatSelection = ({ match }) => {
  const event = Number(match.params.event)

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
              />
            )
          }

          return <div> Error </div>
        }}
      />
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
