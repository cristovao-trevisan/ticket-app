import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MdMenu } from 'react-icons/md'
import { Link } from 'react-router-dom'
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

const Title = styled(Link)`
  margin-top: 4px;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
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
    <Title to="/">
      Ticket App
    </Title>
  </Container>
)
Toolbar.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
}

export default Toolbar
