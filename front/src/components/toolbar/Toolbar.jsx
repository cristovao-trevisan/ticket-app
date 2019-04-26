import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MdMenu } from 'react-icons/md'
import { FlatIconButton } from '../common/buttons/FlatButtons'

const Container = styled.div`
  text-align: center;
  padding: 8px;
  margin-bottom: 24px;
  width: calc(100% - 16px); /* Discount padding */
  border-bottom: 1px solid black;
  position: relative;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`
const MenuButton = styled(FlatIconButton)`
  position: absolute;
  left: 24px;
`

const Toolbar = ({ setSidebarOpen }) => (
  <Container>
    <MenuButton onClick={() => setSidebarOpen(true)}>
      <MdMenu />
    </MenuButton>
    <Title> Ticket App </Title>
  </Container>
)
Toolbar.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
}

export default Toolbar
