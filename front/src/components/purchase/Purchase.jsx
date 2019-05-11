import React from 'react'
import AuthRequired from '../auth/AuthRequired'
import SeatSelection from './SeatSelection'

const Purchase = () => (
  <AuthRequired>
    <SeatSelection />
  </AuthRequired>
)

export default Purchase
