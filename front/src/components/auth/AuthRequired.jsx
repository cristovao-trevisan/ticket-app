import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { MdWarning } from 'react-icons/md'

import { FullLoader } from '../load/Loader'
import { warning } from '../../constants/colors'
import shadows from '../../styles/shadows'
import SignIn from './SignIn'

const Warning = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 2px solid ${warning};
  ${shadows[0]}
`
const WarningIcon = styled(MdWarning)`
  color: ${warning};
  margin-right: 8px;
  font-size: 32px;
`

const AuthRequired = ({ children }) => {
  const login = useSelector(state => state.login)
  if (login.loading) return <FullLoader />
  if (login.data) return children

  return (
    <>
      <Warning>
        <WarningIcon />
        This page requires authentication
      </Warning>
      <SignIn />
    </>
  )
}

AuthRequired.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthRequired
