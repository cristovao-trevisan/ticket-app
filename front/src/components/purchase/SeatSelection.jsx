import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useSelector, useActions } from 'react-redux'
import { NamespacedResources } from '@async-resource/react-redux'

import useEventStateEffect from '../../hooks/use-event-state-effect'
import { addSeatToCartSync, removeSeatFromCartSync } from '../../actions/thunk-sync-actions'
import GoToCart from './GoToCart'
import SeatMap from './seat-map/SeatMap'
import AuthRequired from '../auth/AuthRequired'
import SelectedSeats from './SelectedSeats'
import SeatMapConvention from './seat-map-convention/SeatMapConvention'
import { FullLoader } from '../load/Loader'

const SeatSelection = ({ match }) => {
  const event = Number(match.params.event)
  // hooks
  const addSeatToCart = useActions(cartSeat => addSeatToCartSync(cartSeat))
  const removeSeatFromCart = useActions(cartSeat => removeSeatFromCartSync(cartSeat, true))
  const uid = useSelector(state => state.login.data.uid)
  const [reservations, setReservations] = useState(null)
  const [purchases, setPurchases] = useState(null)
  const [prices, setPrices] = useState(null)
  useEventStateEffect(event, { setReservations, setPurchases, setPrices })

  // computed
  const stateLoaded = !!(reservations && purchases && prices)
  const hasReservation = stateLoaded && Object.values(reservations).some(user => user === uid)

  const sendReservationsToCart = () => {
    const cartSeats = Object.entries(reservations)
      .filter(([, user]) => user === uid)
      .map(([seat]) => Number(seat))
      .map(seat => ({ event, seat, price: Number(prices[seat]) }))
    cartSeats.forEach(removeSeatFromCart)
    cartSeats.forEach(addSeatToCart)
  }

  return (
    <AuthRequired>
      <NamespacedResources
        ids={['eventInfo', 'eventSeats']}
        namespace={event}
        render={({ eventSeats }, state) => {
          if (state.loading || !stateLoaded) return <FullLoader />
          if (state.loaded) {
            return (
              <>
                <SeatMap
                  event={event}
                  fixtureAreas={eventSeats.data.fixtureAreas}
                  numberedSeats={eventSeats.data.numberedSeats}
                  seatAreas={eventSeats.data.seatAreas}
                  reservations={reservations}
                  purchases={purchases}
                  prices={prices}
                />
                <SeatMapConvention />
                <SelectedSeats
                  event={event}
                  prices={prices}
                  reservations={reservations}
                />
                {hasReservation && <GoToCart onClick={sendReservationsToCart} />}
              </>
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
