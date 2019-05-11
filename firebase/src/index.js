// @ts-check
import * as functions from 'firebase-functions'
import firebase from 'firebase-admin'

import authGatewayApp from './auth-gateway/auth-gateway'
import { makeRhubRequest } from './rhub';

firebase.initializeApp()

export const authGateway = functions.https.onRequest(authGatewayApp)
export const onUserCreate = functions.auth.user().onCreate((user) => {
  const { displayName, email, uid } = user
  return makeRhubRequest('/event/user.on-create', 'POST', { displayName, email, uid })
})

if (process.env.NODE_ENV !== 'production') authGatewayApp.listen(8081)
