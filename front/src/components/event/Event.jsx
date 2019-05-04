import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Event = ({ match }) => {
  const { event } = match.params
  return (
    <div>
      { event }
    </div>
  )
}

Event.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      event: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default withRouter(Event)
