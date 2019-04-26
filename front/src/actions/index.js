import * as types from '../constants/action-types'

export const setWindowDimensions = dimensions => ({
  type: types.SET_WINDOW_DIMENSIONS,
  ...dimensions,
})
export const setLoginState = state => ({
  type: types.SET_LOGIN_STATE,
  state,
})
