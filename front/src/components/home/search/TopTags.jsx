import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Resource } from '@async-resource/react-redux'

import { FullLoader } from '../../load/Loader'
import Tag from './Tag'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  flex-wrap: wrap;
  margin-top: 32px;
`

const TopTags = ({ tags }) => (
  <Container>
    {tags.map(({ id, title }, index) => (
      <Tag
        key={id}
        title={title}
        index={index}
      />
    ))}
  </Container>
)
TopTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
}
export default () => (
  <Resource
    id="topTags"
    render={(resource) => {
      if (resource.loading) return <FullLoader />
      if (resource.loaded) return <TopTags tags={resource.data} />

      return <div> Error </div>
    }}
  />
)
