// @ts-check

import * as functions from 'firebase-functions'
import got from 'got'

const { key: client_key, secret: client_secret } = functions.config().rhub

export const RHUB_URL = 'https://ticket-app.reactivehub.io'
export const AUTH_HEADERS = { client_secret, client_key }

export const makeRhubRequest = async (url, method, bd, response) => {
  try {
    const headers = { ...AUTH_HEADERS }
    const body = method === 'GET' ? undefined : JSON.stringify(bd)
    if (body) headers['Content-Type'] = 'application/json'
    const res = await got(`${RHUB_URL}${url}`, { method, body, headers })
    if (response) response.status(res.statusCode).send(res.body)
    return res
  }
  catch (err) {
    console.error('request failed', err);
    if (response) response.status(err.statusCode || 500).send(err.response && err.response.body)
    else throw err
  }
}
