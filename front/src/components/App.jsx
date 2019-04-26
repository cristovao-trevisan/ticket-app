import React from 'react'
import styled from 'styled-components'
import ReactSidebar from 'react-sidebar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useRedux } from 'react-redux'

import eventSeatsExample from '../constants/event-seats.example'
import Toolbar from './toolbar/Toolbar'
import Sidebar from './sidebar/Sidebar'
import Loadable from './load/Loadable'
import { setSidebarOpen as setSidebarOpenAction } from '../actions'

const SeatMap = Loadable(() => import('./seat-selection/seat-map/SeatMap'))
const SignIn = Loadable(() => import('./auth/SignIn'))

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

  return (
    <BrowserRouter>
      <ReactSidebar
        sidebar={<Sidebar setSidebarOpen={setSidebarOpen} />}
        open={sidebarOpen}
        onSetOpen={setSidebarOpen}
      >
        <Container>
          <Toolbar setSidebarOpen={setSidebarOpen} />
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/" component={() => <SeatMap {...eventSeatsExample} />} />
          </Switch>
        </Container>
      </ReactSidebar>
    </BrowserRouter>
  )
}

export default App
