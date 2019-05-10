import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import SelectedSeatInfo from '../common/SelectedSeatInfo'
import CartEventTitle from './CartEventTitle'
import { signature } from '../../constants/colors'

const byAscSeatId = (a, b) => (a > b ? 1 : -1)
const cartSeatMapper = onPrice => cartSeat => (
  <SelectedSeatInfo
    key={cartSeat.seat}
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
  const [totalPrice, setTotalPrice] = useState(0)
  const prices = {}
  const onPrice = seat => (price) => {
    prices[seat] = price
    setTotalPrice(Object.values(prices).reduce((a, b) => a + b))
  }
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
