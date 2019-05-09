import firebase from 'firebase-admin'
import isUrlOpen from './open-urls'

/**
 * @param {import('firebase-functions').Request} request 
 * @param {import('firebase-functions').Response} response 
 * @param {function} next 
*/
export const cors = (request, response, next) => {
  response.set('Access-Control-Allow-Origin', '*')
  response.set('Access-Control-Allow-Headers', 'Authorization')
  if (request.method === 'OPTIONS') {
    response.status(204).send()
  } else {
    next()
  }
}

export const checkAuth = (useOpenUrls = true) => {
  /**
   * Sets request.auth = { email, uid } | null
   * @param {import('firebase-functions').Request} request 
   * @param {import('firebase-functions').Response} response 
   * @param {function} next 
  */
  const doCheck = async (request, response, next) => {
    if (process.env.NODE_ENV !== 'production') {
      // dev mode
      request.auth = { open: true }
      next()
      return
    }

    if (useOpenUrls && isUrlOpen(request.url)) {
      request.auth = { open: true }
      next()
      return
    }

    const auth = firebase.auth()
    const token = request.header('Authorization')
    if (!token) {
      response.status(401).send('Private route, authorization required')
    }
  
    try {
      const decoded = await auth.verifyIdToken(token.replace('Bearer ', ''))
      const { email, uid } = await auth.getUser(decoded.uid)
      
      request.auth = { email, uid }
      next()
    } catch (err) {
      console.error('checkAuth', err)
      response.status(401).send(err.message)
    }
  }
  return doCheck
}