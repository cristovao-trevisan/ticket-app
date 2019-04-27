import React from 'react'
import PropTypes from 'prop-types'
import RouteButton from './RouteButton'
import menuRoutes from '../../../menu-routes'

const Router = ({ routes }) => (
  <>
    {routes.map(({ icon, title, path }) => (
      <RouteButton
        key={path}
        to={path}
        icon={icon}
        title={title}
      />
    ))}
  </>
)
Router.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })),
}
Router.defaultProps = {
  routes: menuRoutes,
}

export default Router
