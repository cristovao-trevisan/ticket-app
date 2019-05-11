import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import SelectedSeatInfo from '../common/SelectedSeatInfo'
import CartEventTitle from './CartEventTitle'
import { signature } from '../../constants/colors'

const byAscSeatId = (a, b) => (a > b ? 1 : -1)
const cartSeatMapper = onPrice => (cartSeat, index) => (
  <SelectedSeatInfo
    key={`${cartSeat.seat} - ${index}`}
    {...cartSeat}
    onPrice={onPrice(cartSeat.seat)}
  />
)

const Total = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${signature};
  margin-top: 16px;
`

const Cart = () => {
  const { cartSeats } = useSelector(state => state.cart)
  const [prices, setPrices] = useState({})
  const onPrice = seat => (price) => {
    if (prices[seat] === price) return // prevent loop
    setPrices({ ...prices, [seat]: price })
  }
  const totalPrice = Object.values(prices).reduce((a, b) => a + b, 0)
  const cartSeatsByEventMap = cartSeats
    .sort(byAscSeatId)
    .reduce((acc, cartSeat) => {
      const { event } = cartSeat
      const eventSeats = acc[event] || []
      return { ...acc, [event]: eventSeats.concat(cartSeat) }
    }, {})

  return (
    <div>
      {Object.entries(cartSeatsByEventMap).map(([event, eventCartSeats]) => (
        <div key={event}>
          <CartEventTitle event={Number(event)} />
          { eventCartSeats.map(cartSeatMapper(onPrice)) }
        </div>
      ))}
      <Total> Total: ${ totalPrice } </Total>
    </div>
  )
}

export default Cart
