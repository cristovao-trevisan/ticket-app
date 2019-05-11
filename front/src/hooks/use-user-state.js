import 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from 'firebase/app'
import { useSelector } from 'react-redux'

export default () => {
  const uid = useSelector(state => state.login.data.uid)
  const [numberedSeatsPriceState, setNumberedSeatsPrice] = useState(null)
  const [seatAreasAmountState, setSeatAreasAmount] = useState(null)
  const [infoState, setSeatInfo] = useState(null)
  useEffect(() => firestore().doc(`/users/${uid}`).onSnapshot((snapshot) => {
    if (snapshot.exists) {
      const { numberedSeatsPrice, seatAreasAmount, ...info } = snapshot.data()
      setSeatInfo(info)
      setNumberedSeatsPrice(numberedSeatsPrice || {})
      setSeatAreasAmount(seatAreasAmount || {})
    } else {
      setNumberedSeatsPrice({})
      setSeatAreasAmount({})
      setSeatInfo({})
    }
  }), [uid])

  const loaded = !!(numberedSeatsPriceState && seatAreasAmountState && infoState)
  return [
    loaded,
    numberedSeatsPriceState,
    seatAreasAmountState,
    infoState,
  ]
}
