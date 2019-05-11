import 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from 'firebase/app'

export default (event) => {
  const [reservationsState, setReservations] = useState(null)
  const [purchasesState, setPurchases] = useState(null)
  const [pricesState, setPrices] = useState(null)
  const [areasState, setAreas] = useState(null)
  useEffect(() => firestore().doc(`/events/${event}`).onSnapshot((snapshot) => {
    if (snapshot.exists) {
      const {
        reservations = {},
        purchases = {},
        prices = {},
        areas = {},
      } = snapshot.data()
      setReservations(reservations)
      setPurchases(purchases)
      setPrices(prices)
      setAreas(areas)
    } else {
      setReservations({})
      setPurchases({})
      setPrices({})
      setAreas({})
    }
  }), [event])

  return [
    reservationsState,
    purchasesState,
    pricesState,
    areasState,
  ]
}
