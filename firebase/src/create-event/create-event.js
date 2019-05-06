// @ts-check
import * as functions from 'firebase-functions'
import express from 'express'
import got from 'got'

import { cors, checkAuth } from '../middleware/middleware'
import { RHUB_URL, headers } from '../rhub'

const app = express()
app.use(cors)
app.use(checkAuth(false))

app.post('/', async (request, response) => {
  const {
    name,
    description,
    genericSeats,
    seatAreas,
    numberedSeats,
    fixtureAreas,
    tags,
    pricing,
    seatPricing,
    images,
  } = request.body

  // @ts-ignore
  const { email, uid } = request.auth
  const { method } = request
  try {
    const event = await got(`${RHUB_URL}/event/`)
    const response = await Promise.all([
      got(`${RHUB_URL}/event/`, { method, body, headers }),
    ])
  } catch (err) {
    console.error('create-event', err)
    response.status(500).send()
  }
})

export default functions.https.onRequest(app)
