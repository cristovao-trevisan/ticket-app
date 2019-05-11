// @ts-check
import * as functions from 'firebase-functions'
import firebase from 'firebase-admin'

import authGatewayApp from './auth-gateway/auth-gateway'

firebase.initializeApp()

export const authGateway = functions.https.onRequest(authGatewayApp)

if (process.env.NODE_ENV !== 'production') authGatewayApp.listen(8081)
