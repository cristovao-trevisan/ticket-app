import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MdMenu } from 'react-icons/md'
import { FlatIconButton } from '../common/buttons/FlatButtons'
import { signature } from '../../constants/colors'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 24px;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid black;
  background-color: ${signature};
  color: white;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`
const MenuButton = styled(FlatIconButton)`
  position: absolute;
  left: 24px;
  color: white;
  font-size: 24px;
`

const Toolbar = ({ setSidebarOpen }) => (
  <Container>
    <MenuButton size={24} onClick={() => setSidebarOpen(true)}>
      <MdMenu />
    </MenuButton>
    <Title> Ticket App </Title>
  </Container>
)
Toolbar.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
}

export default Toolbar
