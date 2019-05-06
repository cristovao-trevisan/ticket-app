// @ts-check

import * as functions from 'firebase-functions'
import got from 'got'

const { key: client_key, secret: client_secret } = functions.config().rhub

export const RHUB_URL = 'https://ticket-app.reactivehub.io'
export const headers = { client_secret, client_key }

export const makeRhubRequest = async (url, method, bd, response) => {
  try {
    const body = method === 'GET' ? undefined : bd
    const res = await got(`${RHUB_URL}${url}`, { method, body, headers })
    response.status(res.statusCode).send(res.body);
  }
  catch (err) {
    console.error('request failed', err);
    response.status(err.statusCode || 500).send(err.response && err.response.body);
  }
}
