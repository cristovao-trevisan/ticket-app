import { auth } from 'firebase/app'
import 'firebase/auth'
import { SET_LOGIN_STATE } from '../constants/action-types'
import { setLoginState } from '../actions'

const initialState = {
  loading: true,
  data: null,
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case SET_LOGIN_STATE: return { loading: false, data }
    default: return state
  }
}

export const registerAuthListener = store => auth().onAuthStateChanged(
  user => store.dispatch(setLoginState(user)),
)
