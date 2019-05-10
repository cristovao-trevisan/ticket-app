/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import { areaDimensions } from './commom'
import { fixture } from '../../../../constants/colors'

const FixtureArea = styled.div`
  background-color: ${fixture};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`

const fixtureAreaMapper = ({ multiplier }) => ({ id, name, locationStart, locationEnd }) => (
  <FixtureArea
    key={id}
    style={areaDimensions({ locationEnd, locationStart, multiplier }).style}
  >
    { name }
  </FixtureArea>
)

export default fixtureAreaMapper
