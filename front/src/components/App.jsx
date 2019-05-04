import React from 'react'
import styled from 'styled-components'
import ReactSidebar from 'react-sidebar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useRedux, useSelector } from 'react-redux'

import Toolbar from './toolbar/Toolbar'
import Sidebar from './sidebar/Sidebar'
import Loadable from './load/Loadable'
import { setSidebarOpen as setSidebarOpenAction } from '../actions'
import menuRoutes from '../menu-routes'
import { FullLoader } from './load/Loader'

const SignIn = Loadable(() => import('./auth/SignIn'))
const Event = Loadable(() => import('./event/Event'))

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useRedux(
    state => state.sidebarOpen,
    open => setSidebarOpenAction(open),
  )
  const loadingAuth = useSelector(state => state.login.loading)

  if (loadingAuth) return <FullLoader />

  return (
    <BrowserRouter>
      <ReactSidebar
        sidebar={<Sidebar />}
        open={sidebarOpen}
        onSetOpen={setSidebarOpen}
      >
        <Container>
          <Toolbar setSidebarOpen={setSidebarOpen} />
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/event/:event" component={Event} />
            {menuRoutes.reverse().map(({ path, component }) => (
              <Route key={path} path={path} component={Loadable(component)} />
            ))}
          </Switch>
        </Container>
      </ReactSidebar>
    </BrowserRouter>
  )
}

export default App
