import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SearchInput from './SearchInput'
import TopTags from './TopTags'

const Search = () => {
  const search = useSelector(state => state.search)
  const showTopTags = search.tags.length === 0 && search.text.length === 0

  return (
    <>
      <SearchInput />
      {showTopTags && <TopTags />}
    </>
  )
}

export default withRouter(Search)
