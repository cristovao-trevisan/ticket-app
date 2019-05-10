import 'firebase/firestore'
import { useEffect } from 'react'
import { firestore } from 'firebase/app'

const voidFunction = () => {}

export default (
  event, {
    setReservations = voidFunction,
    setPurchases = voidFunction,
    setPrices = voidFunction,
  },
) => useEffect(() => {
  const doc = firestore().doc(`/events/${event}`)
  return doc.onSnapshot((snapshot) => {
    if (snapshot.exists) {
      const {
        reservations = {},
        purchases = {},
        prices = {},
      } = snapshot.data()
      setReservations(reservations)
      setPurchases(purchases)
      setPrices(prices)
    }
  })
}, [event])
