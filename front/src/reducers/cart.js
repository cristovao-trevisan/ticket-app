import { ADD_SEAT_TO_CART, REMOVE_SEAT_FROM_CART } from '../constants/action-types'

/**
 * @typedef {object} CartSeat
 * @prop {number} event
 * @prop {number} seat
 * @prop {number} price
*/

/**
 * @typedef {object} AddSeatAction
 * @prop {CartSeat} cartSeat
 */

const initialState = {
  /** @type {CartSeat[]} */
  cartSeats: [],
}

const searchBySeat = a => b => a.seat === b.seat
const searchBySeatAndPrice = a => b => a.seat === b.seat && a.price === b.price

export default (state = initialState, action) => {
  const { cartSeats } = state
  /** @type {AddSeatAction} */
  const { cartSeat } = action

  switch (action.type) {
    case ADD_SEAT_TO_CART: {
      return {
        cartSeats: [...cartSeats, cartSeat],
      }
    }
    case REMOVE_SEAT_FROM_CART: {
      const search = action.usePricing ? searchBySeatAndPrice : searchBySeat
      const matchIndex = cartSeats.findIndex(search(cartSeat))
      if (matchIndex >= 0) {
        return {
          cartSeats: [
            ...cartSeats.slice(0, matchIndex),
            ...cartSeats.slice(matchIndex + 1),
          ],
        }
      }
      return state
    }
    default: return state
  }
}
