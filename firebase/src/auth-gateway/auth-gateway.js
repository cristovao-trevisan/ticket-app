// @ts-check

import queryString from 'query-string'
import express from 'express'

import { checkAuth, cors } from '../middleware/middleware'
import { makeRhubRequest } from '../rhub'


const app = express()
app.use(cors)
app.use(checkAuth(true))
app.use(express.json())

function parseRequestInfo(method, request, email, uid) {
  if (method === 'GET') {
    const { query, url: urlOnly } = queryString.parseUrl(request.url);
    return {
      url: `${urlOnly}?${queryString.stringify({
        ...query,
        auth_email: email,
        auth_uid: uid,
      })}`,
    }
  }
  return {
    body: request.body && {
      ...request.body,
      auth: { email, uid },
    },
    url: request.url,
  }
}


app.all('*', async (request, response) => {
  // @ts-ignore
  const { open, email, uid } = request.auth
  if (open) {
    const { method, url, body } = request
    await makeRhubRequest(url, method, body, response)
  } else {
    const { method } = request
    const { url, body } = parseRequestInfo(method, request, email, uid);

    await makeRhubRequest(url, method, body, response);
  }
})

export default app
