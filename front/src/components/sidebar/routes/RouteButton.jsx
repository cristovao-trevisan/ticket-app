import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FlatLink } from '../../common/buttons'

const Title = styled.span`
  margin-top: 4px;
  margin-left: 8px;
  font-weight: bold;  
`
const CentralizedFlatLink = styled(FlatLink)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const RouteButton = ({ icon: Icon, title, to }) => (
  <CentralizedFlatLink to={to}>
    <Icon size={18} />
    <Title> { title } </Title>
  </CentralizedFlatLink>
)
RouteButton.propTypes = {
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default RouteButton
