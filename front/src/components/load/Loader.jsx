import React from 'react'
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { spinner } from '../../constants/colors'

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}
const defaultProps = {
  size: 60,
  color: spinner,
}

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Loader = ({ size, color }) => (
  <ReactLoading
    type="spin"
    color={color}
    height={size}
    width={size}
  />
)

export const FullLoader = props => (
  <FullContainer>
    <Loader {...props} />
  </FullContainer>
)
Loader.propTypes = propTypes
Loader.defaultProps = defaultProps
FullLoader.propTypes = propTypes
FullLoader.defaultProps = defaultProps
