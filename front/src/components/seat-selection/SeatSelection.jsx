import React from 'react'
import AuthRequired from '../auth/AuthRequired'
import SeatMap from './seat-map/SeatMap'
import eventSeatsExample from '../../constants/event-seats.example'

const SeatSelection = () => (
  <AuthRequired>
    <SeatMap {...eventSeatsExample} />
  </AuthRequired>
)

export default SeatSelection
