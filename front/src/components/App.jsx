import React, { useState } from 'react'
import styled from 'styled-components'
import ReactSidebar from 'react-sidebar'

import SeatMap from './seat-selection/seat-map/SeatMap'
import eventSeatsExample from '../constants/event-seats.example'
import Toolbar from './toolbar/Toolbar'
import Sidebar from './sidebar/Sidebar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ReactSidebar
      sidebar={<Sidebar />}
      open={sidebarOpen}
      onSetOpen={setSidebarOpen}
    >
      <Container>
        <Toolbar setSidebarOpen={setSidebarOpen} />
        <SeatMap {...eventSeatsExample} />
      </Container>
    </ReactSidebar>
  )
}

export default App
