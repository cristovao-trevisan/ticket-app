// @ts-check
import express from 'express'
import { firestore } from 'firebase-admin'
import { config } from 'firebase-functions'
import got from 'got'
import { makeRhubRequest } from '../rhub'

const app = express()
const { token: reservationToken } = config().reservation

app.use(express.json())
// auth
app.use((request, response, next) => {
  const token = request.header('reservation-token')
  if (token !== reservationToken) response.status(400).send('missing param')
  else next()
})
// check params
app.use((request, response, next) => {
  // @ts-ignore
  const { event, seat, auth } = request.body || {}
  // @ts-ignore
  const { uid } = auth || {}
  if (!event || !seat || !uid) response.status(400).send('missing param')
  else next()
})

app.post('/reserve', async (request, response) => {
  const { event, seat } = request.body
  
  // forbid overwrite
  const doc = await firestore().doc(`/reservations/${event}`).get()
  if (doc.exists) {
    const { reservations = {} } = doc.data()
    if (reservations[seat]) {
      response.status(403).send()
      return
    }
  }

  await makeRhubRequest('/event/reservation.do-reserve-numbered-seat', 'POST', request.body, response)
})

app.post('/un-reserve', async (request, response) => {
  const { event, seat, auth: { uid } } = request.body

  // event doc not found
  const doc = await firestore().doc(`/reservations/${event}`).get()
  if (!doc.exists) {
    response.status(404).send()
    return
  }

  // forbid overwrite
  const { reservations = {} } = doc.data()
  if (String(reservations[seat]) !== String(uid)) {
    response.status(401).send()
    return
  }

  await makeRhubRequest('/event/reservation.do-un-reserve-numbered-seat', 'POST', request.body, response)
})

export default app
