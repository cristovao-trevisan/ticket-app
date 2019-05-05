const got = require('got')
const functions = require('firebase-functions')
const firebase = require('firebase-admin')
const queryString = require('query-string')
const isUrlOpen = require('./open-urls')

firebase.initializeApp()
const auth = firebase.auth()
const { key, secret } = functions.config().rhub
const headers = {
  client_secret: secret,
  client_key: key
}
const RHUB_URL = 'https://ticket-app.reactivehub.io'

async function makeRequest(url, method, bd, response) {
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

function parseRequestInfo(method, request, email, uid) {
  if (method === 'GET') {
    const { query, url: urlOnly } = queryString.parseUrl(request.url);
    return {
      url: `${urlOnly}?${queryString.stringify({ ...query, email, uid })}`,
    }
  }
  return {
    body: request.body && {
      ...request.body,
      email, uid,
    },
    url: request.url,
  }
}


exports.authGateway = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  response.set('Access-Control-Allow-Headers', 'Authorization')
  if (request.method === 'OPTIONS') {
    response.status(204).send()
    return
  }

  try {
    if (isUrlOpen(request.url)) {
      return makeRequest(request.url, request.method, request.body, response)
    }
    const token = request.header('Authorization').replace('Bearer ', '')
    const decoded = await auth.verifyIdToken(token)
    const { email, uid } = await auth.getUser(decoded.uid)
    const { method } = request
    
    const { url, body } = parseRequestInfo(method, request, email, uid);
    await makeRequest(url, method, body, response);
  } catch (err) {
    console.error('unauthorized', err)
    response.status(401).send()
  }
})
