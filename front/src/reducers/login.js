import { auth } from 'firebase/app'
import 'firebase/auth'
import { SET_LOGIN_STATE } from '../constants/action-types'
import { setLoginState } from '../actions'


export default (state = null, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE: return action.state
    default: return state
  }
}

export const registerAuthListener = store => auth().onAuthStateChanged(
  user => store.dispatch(setLoginState(user)),
)
