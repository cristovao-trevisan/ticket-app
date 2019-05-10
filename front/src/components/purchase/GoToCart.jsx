import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MdShoppingCart } from 'react-icons/md'
import { RaisedLinkButton } from '../common/buttons'
import { green } from '../../constants/colors'

const Button = styled(RaisedLinkButton)`
  margin: 16px 0;
  color: white;
  background-color: ${green[0]};
`

const GoToCart = ({ onClick }) => (
  <Button to="/cart" onClick={onClick}>
    <MdShoppingCart />
    Go To Cart
  </Button>
)
GoToCart.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default GoToCart
