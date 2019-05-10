import React from 'react'
import PropTypes from 'prop-types'
import { NamespacedResource } from '@async-resource/react-redux'
import { FullLoader } from '../components/load/Loader'


export default (Component) => {
  const WithEventInfo = ({ event }) => (
    <NamespacedResource
      id="eventInfo"
      namespace={event}
      render={(resource) => {
        if (resource.loading) return <FullLoader />
        if (resource.loaded) return <Component {...resource.data} />
        return <div> Error </div>
      }}
    />
  )
  WithEventInfo.propTypes = {
    event: PropTypes.number.isRequired,
  }
  return WithEventInfo
}
