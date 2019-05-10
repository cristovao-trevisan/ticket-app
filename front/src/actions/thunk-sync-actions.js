import * as types from '../constants/action-types'

export const addSeatToCartSync = cartSeat => ({
  type: types.ADD_SEAT_TO_CART,
  cartSeat,
})

export const removeSeatFromCartSync = (cartSeat, usePricing = false) => ({
  type: types.REMOVE_SEAT_FROM_CART,
  usePricing,
  cartSeat,
})
