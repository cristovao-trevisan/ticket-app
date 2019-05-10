import React from 'react'
import styled from 'styled-components'

import { selected, vacant, reserved, occupied } from '../../../constants/colors'
import SeatMapConventionItem from './SeatMapConventionItem'

const ItemsContainer = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const SeatMapConvention = () => (
  <ItemsContainer>
    <SeatMapConventionItem color={selected} text="Selected" />
    <SeatMapConventionItem color={vacant} text="Vacant" />
    <SeatMapConventionItem color={reserved} text="Reserved" />
    <SeatMapConventionItem color={occupied} text="Occupied" />
  </ItemsContainer>
)

export default SeatMapConvention
