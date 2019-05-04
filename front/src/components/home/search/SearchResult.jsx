
import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { NamespacedResource } from '@async-resource/react-redux'

import { FullLoader } from '../../load/Loader'
import { FlatLink } from '../../common/buttons'


const Container = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 250px;
  overflow-y: scroll;
  width: 80%;
`

const SearchResult = () => {
  const { tags, text } = useSelector(state => state.search)
  const searchText = tags.concat(text).join(' ')

  return (
    <Container>
      <NamespacedResource
        id="search"
        namespace={searchText}
        render={(resource) => {
          if (resource.loading) return <FullLoader />
          if (resource.loaded) {
            if (resource.data.length === 0) {
              return <div> No events found </div>
            }

            return resource.data.map(({ id, name }) => (
              <FlatLink key={id}>
                { name }
              </FlatLink>
            ))
          }
          return <div> Error </div>
        }}
      />
    </Container>
  )
}

export default SearchResult
