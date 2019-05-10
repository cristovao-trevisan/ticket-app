import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  margin-top: 8px;
  background-color: ${props => props.color}40;
`
const Circle = styled.div`
  background-color: ${props => props.color};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  text-align: center;
`
const Text = styled.div`
  font-size: 12px;
  margin-left: 2px;
`

const SeatMapConventionItem = ({ text, color }) => (
  <Container color={color}>
    <Circle color={color} />
    <Text> {text} </Text>
  </Container>
)
SeatMapConventionItem.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default SeatMapConventionItem
