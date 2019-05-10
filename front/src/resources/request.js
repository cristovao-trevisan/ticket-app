import { auth } from 'firebase/app'

const BASE_URL = 'https://us-central1-rhub-ticket-app.cloudfunctions.net/authGateway'

const buildQueryString = obj => Object.keys(obj)
  .reduce((acc, key) => `${acc}&${key}=${obj[key]}`, '')
  .slice(1) // remove leading &

export default async (
  url,
  data,
  method = 'GET',
  { parseAsQuery = true, isArray = false } = {},
) => {
  const options = { method, headers: {} }
  if (method === 'GET') {
    options.url = `${BASE_URL}${url}?${buildQueryString(data)}`
  } else {
    options.url = `${BASE_URL}${url}`
    options.body = JSON.stringify(data)
    options.headers['Content-Type'] = 'application/json'
  }

  const user = auth().currentUser
  if (user) {
    const token = await user.getIdToken()
    options.headers.Authorization = `Bearer ${token}`
  }

  return fetch(options.url, options)
    .then((response) => {
      if (response.status >= 400) throw new Error('request failed')
      return response.json()
    })
    .then((res) => {
      if (!parseAsQuery) return res
      if (res.status !== true) throw new Error('request failed')
      if (isArray) return res.data
      return res.data[0]
    })
}
