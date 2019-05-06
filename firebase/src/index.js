import * as functions from 'firebase-functions'
import firebase from 'firebase-admin'

import authGatewayApp from './auth-gateway/auth-gateway'
// import createEvent from './create-event/create-event'

firebase.initializeApp()

export const authGateway = functions.https.onRequest(authGatewayApp)
// exports.createEvent = createEvent
if (process.env.NODE_ENV !== 'production') authGatewayApp.listen(8080)
