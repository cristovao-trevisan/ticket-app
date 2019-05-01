import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useActions } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { FlatButton } from '../../common/buttons'
import { commitSearchValue } from '../../../actions'
import { tagChips as colors } from '../../../constants/colors'

const Container = styled.div`
  margin: 8px;
  flex: 0 0 22%;
  display: flex;
  justify-content: center;
`
const Button = styled(FlatButton)`
  width: 80px;
  height: 40px;
  padding: 2px;
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
    <Container>
      <Button onClick={() => setSearch(`#${title}`)} {...getChipColors(index)}>
        #{ title }
      </Button>
    </Container>
  )
}
Tag.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
}

export default withRouter(Tag)
