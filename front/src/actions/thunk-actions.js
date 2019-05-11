import * as sync from './thunk-sync-actions'
import request from '../resources/request'
import showToastMessage from '../extra/show-toast-message'

const didRequestWork = (response) => {
  try {
    return response.match_rules[0].actions[0].response.responseCode < 300
      && response.match_rules[0].actions[0].response.responsePayload.data.data.length > 0
  } catch (err) {
    return false
  }
}

const eventUrl = (type, add = true) => {
  const remove = add ? '' : 'un-'
  switch (type) {
    case 'numberedSeat': return `/event/reservation.${remove}reserve-numbered-seat`
    case 'genericSeat':
    case 'seatArea':
      return `/event/reservation.${remove}reserve-seat-area`
    default: return null
  }
}

export const addSeatToCart = (cartSeat, type) => async (dispatch) => {
  const url = eventUrl(type, true)
  if (!url) return

  showToastMessage({ message: 'Reserving Seat...', title: 'Reservation', timeout: 3000 })
  const response = await request(url, cartSeat, 'POST', { parseAsQuery: false })
  const worked = didRequestWork(response)
  if (worked) {
    showToastMessage({ message: 'Successful', title: 'Reservation', type: 'success' })
    dispatch(sync.addSeatToCartSync(cartSeat))
  } else {
    showToastMessage({ message: 'Failed (check your internet connection)', title: 'Reservation', type: 'failure' })
  }
}

export const removeSeatFromCart = (cartSeat, type, usePricing = false) => async (dispatch) => {
  const url = eventUrl(type, false)
  if (!url) return

  showToastMessage({ message: 'Removing', title: 'Reservation', timeout: 3000 })
  const response = await request(url, cartSeat, 'POST', { parseAsQuery: false })
  const worked = didRequestWork(response)
  if (worked) {
    showToastMessage({ message: 'Removed', title: 'Reservation', type: 'success' })
    dispatch(sync.removeSeatFromCartSync(cartSeat, usePricing))
  } else {
    showToastMessage({ message: 'Failed to remove (check your internet connection)', title: 'Reservation', type: 'failure' })
  }
}
