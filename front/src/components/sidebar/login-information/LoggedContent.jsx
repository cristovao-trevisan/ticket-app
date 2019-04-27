import React, { useState } from 'react'
import { useSelector, useActions } from 'react-redux'
import styled from 'styled-components'
import { auth } from 'firebase/app'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

import { FlatButton, RaisedButton } from '../../common/buttons'
import { purple } from '../../../constants/colors'
import { setSidebarOpen } from '../../../actions'

const Container = styled.div`
  background-color: ${props => (props.open ? purple[1] : 'transparent')};
  border-radius: 4px;
`
const UserButton = styled(FlatButton)`
  color: white;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const UserName = styled.div`
  text-overflow: ellipsis; 
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
`
const ArrowDown = styled(MdKeyboardArrowDown)`font-size: 24px;`
const ArrowUp = styled(MdKeyboardArrowUp)`font-size: 24px;`

const Options = styled.div`
  padding: 4px;
  padding-top: 0;
`
const OptionButton = styled(RaisedButton)`
  background-color: ${purple[2]};
  width: 100%;
  font-weight: bold;
  color: ${purple[0]};
`

const LoggedContent = () => {
  const [open, setOpen] = useState(false)
  const closeSidebar = useActions(() => setSidebarOpen(false))
  const { data: { displayName, email } } = useSelector(state => state.login)

  const onSignOut = () => {
    auth().signOut()
    closeSidebar()
  }

  const user = displayName || email

  return (
    <Container open={open}>
      <UserButton onClick={() => setOpen(!open)}>
        { open ? <ArrowUp /> : <ArrowDown /> }
        <UserName> { user } </UserName>
      </UserButton>
      {open && (
        <Options>
          <OptionButton onClick={onSignOut}>
            Sign Out
          </OptionButton>
        </Options>
      )}
    </Container>
  )
}

export default LoggedContent
