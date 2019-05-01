import * as types from '../constants/action-types'

export const setWindowDimensions = dimensions => ({
  type: types.SET_WINDOW_DIMENSIONS,
  ...dimensions,
})
export const setLoginState = data => ({
  type: types.SET_LOGIN_STATE,
  data,
})
export const setSidebarOpen = (open = false) => ({
  type: types.SET_SIDEBAR_OPEN,
  open,
})
export const setSearchValue = value => ({
  type: types.SET_SEARCH_VALUE,
  value,
})

export const commitSearchValue = (value, history) => ({
  type: types.COMMIT_SEARCH_VALUE,
  value,
  history,
})
