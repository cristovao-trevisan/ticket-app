import React from 'react'
import ReactLoading from 'react-loading'
import { spinner } from '../../constants/colors'

export default () => (
  <ReactLoading
    type="spin"
    color={spinner}
    height="20%"
    width="20%"
  />
)
