import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import withEventInfo from '../../hoc/with-event-info'
import { signature } from '../../constants/colors'

const Title = styled.div`
  font-size: 18px;
  color: ${signature};
  margin-bottom: 8px;
`
const CartEventTitle = ({ name }) => <Title> { name } </Title>

CartEventTitle.propTypes = {
  name: PropTypes.string.isRequired,
}

export default withEventInfo(CartEventTitle)
