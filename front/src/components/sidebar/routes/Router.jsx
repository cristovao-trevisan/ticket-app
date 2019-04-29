import React from 'react'
import PropTypes from 'prop-types'
import { useActions } from 'react-redux'

import RouteButton from './RouteButton'
import menuRoutes from '../../../menu-routes'
import { setSidebarOpen } from '../../../actions'

const Router = ({ routes }) => {
  const closeSidebar = useActions(() => setSidebarOpen(false))
  return (
    <>
      {routes.map(({ icon, title, path }) => (
        <RouteButton
          key={path}
          to={path}
          icon={icon}
          title={title}
          onClick={closeSidebar}
        />
      ))}
    </>
  )
}
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
