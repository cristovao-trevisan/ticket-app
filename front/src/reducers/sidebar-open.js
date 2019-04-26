import { SET_SIDEBAR_OPEN } from '../constants/action-types'

export default (state = false, { type, open }) => {
  switch (type) {
    case SET_SIDEBAR_OPEN: return open
    default: return state
  }
}
