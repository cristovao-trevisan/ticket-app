import React from 'react'
import styled from 'styled-components'
import { useActions } from 'react-redux'
import { Link } from 'react-router-dom'

import { setSidebarOpen as setSidebarOpenAction } from '../../../actions'

const WhiteLink = styled(Link)`
  color: white;
`

const UnLoggedContent = () => {
  const closeSidebar = useActions(() => setSidebarOpenAction(false))

  return (
    <>
      <WhiteLink to="/signin" onClick={closeSidebar}>
        Sign In/Up
      </WhiteLink>
    </>
  )
}

export default UnLoggedContent
