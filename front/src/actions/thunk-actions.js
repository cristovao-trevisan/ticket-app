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
export const addSeatToCart = (cartSeat, type) => async (dispatch) => {
  switch (type) {
    case 'numberedSeat': {
      showToastMessage({ message: 'Reserving Seat...', title: 'Reservation', timeout: 3000 })
      const response = await request('/event/reservation.reserve-numbered-seat', cartSeat, 'POST', { parseAsQuery: false })
      const worked = didRequestWork(response)
      if (worked) {
        showToastMessage({ message: 'Successful', title: 'Reservation', type: 'success' })
        dispatch(sync.addSeatToCartSync(cartSeat))
      } else {
        showToastMessage({ message: 'Failed (check your internet connection)', title: 'Reservation', type: 'failure' })
      }
      break
    }
    default: break
  }
}

export const removeSeatFromCart = (cartSeat, type, usePricing = false) => async (dispatch) => {
  switch (type) {
    case 'numberedSeat': {
      showToastMessage({ message: 'Removing', title: 'Reservation', timeout: 3000 })
      const response = await request('/event/reservation.un-reserve-numbered-seat', cartSeat, 'POST', { parseAsQuery: false })
      const worked = didRequestWork(response)
      if (worked) {
        showToastMessage({ message: 'Removed', title: 'Reservation', type: 'success' })
        dispatch(sync.removeSeatFromCartSync(cartSeat, usePricing))
      } else {
        showToastMessage({ message: 'Failed to remove (check your internet connection)', title: 'Reservation', type: 'failure' })
      }
      break
    }
    default: break
  }
}
