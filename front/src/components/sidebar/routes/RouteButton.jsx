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

const RouteButton = ({ icon: Icon, title, to, onClick }) => (
  <CentralizedFlatLink to={to} onClick={onClick}>
    <Icon size={18} />
    <Title> { title } </Title>
  </CentralizedFlatLink>
)
RouteButton.propTypes = {
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
RouteButton.defaultProps = {
  onClick: () => null,
}

export default RouteButton
