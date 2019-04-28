import React from 'react'
import { NamespacedResource } from '@async-resource/react-redux'
import AuthRequired from '../auth/AuthRequired'
import SeatMap from './seat-map/SeatMap'
import { FullLoader } from '../load/Loader'

const SeatSelection = () => (
  <AuthRequired>
    <NamespacedResource
      id="eventSeats"
      namespace="test"
      render={(resource) => {
        if (resource.loading) return <FullLoader />
        if (resource.loaded) return <SeatMap {...resource.data} />

        return <div> Error </div>
      }}
    />
  </AuthRequired>
)

export default SeatSelection
