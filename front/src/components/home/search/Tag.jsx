import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useActions } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { FlatButton } from '../../common/buttons'
import { commitSearchValue } from '../../../actions'
import { tagChips as colors } from '../../../constants/colors'

const Container = styled(FlatButton)`
  width: 80px;
  height: 40px;
  padding: 2px;
  margin: 8px;
  background-color: ${props => props.background};
  border: 1px solid ${props => props.border};
  color: black;
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  word-wrap: none;
  text-overflow: ellipsis;
`

const getChipColors = index => colors[index % colors.length]

const Tag = ({ title, history, index }) => {
  const setSearch = useActions(value => commitSearchValue(value, history))
  return (
    <Container onClick={() => setSearch(`#${title}`)} {...getChipColors(index)}>
      #{ title }
    </Container>
  )
}
Tag.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
}

export default withRouter(Tag)
