import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useActions, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { MdSearch } from 'react-icons/md'

import { signature, purple } from '../../../constants/colors'
import { FlatIconButton } from '../../common/buttons'
import { setSearchValue, commitSearchValue } from '../../../actions'

const Container = styled.div`
  position: relative;
  width: 70%;
  max-width: 400px;
`
const Input = styled.input`
  height: 40px;
  border-width: 2px;
  border-style: solid;
  border-color: ${purple[1]};
  border-radius: 16px;
  padding-left: 12px;
  width: calc(100% - 16px);
  outline: none;
  font-size: 14px;

  :focus {
    border-color: ${signature};
  }
`
const IconContainer = styled.div`
  position: absolute;
  right: 2px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
`

const Icon = styled(FlatIconButton)`
  color: ${signature};
  cursor: pointer;
`

const SearchInput = ({ history }) => {
  const [focus, setFocus] = useState(false)
  const value = useSelector(state => state.search.temp)
  const setValue = useActions(setSearchValue)
  const commitValue = useActions(() => commitSearchValue(value, history))
  const handleSubmit = event => event.keyCode === 13 && commitValue() // Enter key

  return (
    <Container focus={focus}>
      <Input
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleSubmit}
        onFocus={() => setFocus(true)}
        placeholder="Search by name, location or tags"
        value={value}
      />
      <IconContainer>
        <Icon size={24} onClick={commitValue}>
          <MdSearch />
        </Icon>
      </IconContainer>
    </Container>
  )
}
SearchInput.propTypes = {
  history: PropTypes.shape().isRequired,
}

export default withRouter(SearchInput)
