import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  transform: translate(-50%, calc(-100% - 8px));
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  padding: 8px;
  border: 1px solid black;
  width: fit-content;
  height: fit-content;

  ::after, ::before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: "";
    width: 0;
    height: 0;
    position: absolute;
  }

  ::after {
    border-top-color: white;
    border-width: 8px;
    margin-left: -8px;
  }
  ::before {
    border-top-color: black;
    border-width: 9px;
    margin-left: -9px;
  }
`

const SeatMapPopover = ({ top, left, children }) => (
  <Container top={top} left={left}>
    { children }
  </Container>
)
SeatMapPopover.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  children: PropTypes.node,
}
SeatMapPopover.defaultProps = {
  children: null,
}

export default SeatMapPopover
