// @ts-check
import * as functions from 'firebase-functions'
import firebase from 'firebase-admin'

import authGatewayApp from './auth-gateway/auth-gateway'
import reservationApp from './reservation/reservation'

firebase.initializeApp()

export const authGateway = functions.https.onRequest(authGatewayApp)
export const reservation = functions.https.onRequest(reservationApp)

if (process.env.NODE_ENV !== 'production') {
  authGatewayApp.listen(8081)
  reservationApp.listen(8082)
}
