import React from 'react'
import PropTypes from 'prop-types'
import { NamespacedResource } from '@async-resource/react-redux'

import { Loader } from '../load/Loader'

export default (Component) => {
  const WithImage = ({ url }) => {
    // global url
    if (url.startsWith('http') || url.startsWith('www')) {
      return <Component src={url} />
    }

    return (
      <NamespacedResource
        id="images"
        namespace={url}
        render={({ loading, loaded, data }) => {
          if (loading) return <Loader />
          if (loaded) return <Component src={data} />
          return <div> Error </div>
        }}
      />
    )
  }
  WithImage.propTypes = {
    url: PropTypes.string.isRequired,
  }

  return WithImage
}
