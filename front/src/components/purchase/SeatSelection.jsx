import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useSelector, useActions } from 'react-redux'
import { NamespacedResources } from '@async-resource/react-redux'

import useEventState from '../../hooks/use-event-state'
import useUserState from '../../hooks/use-user-state'
import { addSeatToCartSync, removeSeatFromCartSync } from '../../actions/thunk-sync-actions'
import GoToCart from './GoToCart'
import SeatMap from './seat-map/SeatMap'
import SelectedSeats from './SelectedSeats'
import SeatMapConvention from './seat-map-convention/SeatMapConvention'
import { FullLoader } from '../load/Loader'

const SeatSelection = ({ match }) => {
  const event = Number(match.params.event)
  // hooks
  const addSeatToCart = useActions(cartSeat => addSeatToCartSync(cartSeat))
  const removeSeatFromCart = useActions(cartSeat => removeSeatFromCartSync(cartSeat, true))
  const uid = useSelector(state => state.login.data.uid)
  const cart = useSelector(state => state.cart)
  const [eventStateLoaded, reservations, purchases, prices, areas] = useEventState(event)
  const [userStateLoaded,, seatAreasAmount] = useUserState()

  // computed
  const stateLoaded = eventStateLoaded && userStateLoaded
  const hasReservation = stateLoaded && Object.values(reservations).some(user => user === uid)

  return (
    <NamespacedResources
      ids={['eventInfo', 'eventSeats']}
      namespace={event}
      render={({ eventSeats }, state) => {
        if (state.loading || !stateLoaded) return <FullLoader />
        if (state.loaded) {
          const seatBelongsToEvent = seat => eventSeats.data.seatAreas.some(s => s.id === seat)
          // filter only belonging to this event
          const eventSeatAreasAmount = Object.entries(seatAreasAmount)
            .map(([seat, amount]) => ([Number(seat), amount]))
            .filter(([seat]) => seatBelongsToEvent(seat))
            .filter(([, amount]) => amount > 0)
          const sendReservationsToCart = () => {
            // rebuild cart for numbered seats
            const cartSeats = Object.entries(reservations)
              .filter(([, user]) => user === uid)
              .map(([seat]) => Number(seat))
              .map(seat => ({ event, seat, price: Number(prices[seat]) }))
            cartSeats.forEach(removeSeatFromCart)
            cartSeats.forEach(addSeatToCart)
            // update cart with area seats
            eventSeatAreasAmount.forEach(([seat, amount]) => {
              const cartSeatItems = cart.cartSeats.filter(c => c.seat === seat)
              const amountDiff = cartSeatItems - amount
              // if too much in cart remove some
              if (amountDiff > 0) cartSeatItems.slice(0, amountDiff).forEach(removeSeatFromCart)
              // if too little in cart add more
              else if (amountDiff < 0) {
                const price = eventSeats.data.pricings.find(pr => pr.seat === seat).pricing[0]
                for (let i = amountDiff; i < 0; i += 1) addSeatToCart({ event, seat, price })
              }
            })
          }

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
                areas={areas}
              />
              <SeatMapConvention />
              <SelectedSeats
                event={event}
                prices={prices}
                reservations={reservations}
                seatAreasAmount={eventSeatAreasAmount}
              />
              {hasReservation && <GoToCart onClick={sendReservationsToCart} />}
            </>
          )
        }

        return <div> Error </div>
      }}
    />
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
