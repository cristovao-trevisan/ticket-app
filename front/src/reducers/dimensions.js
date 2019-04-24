import { SET_WINDOW_DIMENSIONS } from '../constants/action-types'

export default ({ width = 0, height = 0 } = {}, action) => {
  switch (action.type) {
    case SET_WINDOW_DIMENSIONS:
      return {
        width: action.width,
        height: action.height,
      }
    default: return { width, height }
  }
}

const getDimensions = () => {
  const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth
  const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight
  return { width, height }
}

const debounce = (time, call) => {
  let timeout = null
  return () => {
    if (timeout) return
    timeout = setTimeout(() => {
      timeout = null
      call()
    }, time)
  }
}

export const onDimensionChange = (cb) => {
  cb(getDimensions())
  const debounceCallback = debounce(200, () => cb(getDimensions()))
  window.addEventListener('resize', debounceCallback, false)
}
