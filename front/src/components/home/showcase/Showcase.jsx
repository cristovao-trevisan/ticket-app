import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Resource } from '@async-resource/react-redux'
import styled from 'styled-components'
import { MdPlayArrow } from 'react-icons/md'
import { FullLoader } from '../../load/Loader'
import ShowcaseItem from './ShowcaseItem'
import { purple } from '../../../constants/colors'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ArrowRight = styled(MdPlayArrow)`
  font-size: 48px;
  color: ${purple[1]};
`
const ArrowLeft = styled(ArrowRight)`transform: rotate(180deg);`

const Showcase = ({ showcases }) => {
  const [index, setIndexAction] = useState(0)
  const event = showcases[index]
  const setIndex = inc => () => {
    const newIndex = index + inc
    if (newIndex < 0 || newIndex === showcases.length) return
    setIndexAction(newIndex)
  }

  return (
    <Container>
      <ArrowLeft onClick={setIndex(-1)} />
      <ShowcaseItem {...event} />
      <ArrowRight onClick={setIndex(+1)} />
    </Container>
  )
}
Showcase.propTypes = {
  showcases: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
}

export default () => (
  <Resource
    id="showcase"
    render={(resource) => {
      if (resource.loading) return <FullLoader />
      if (resource.loaded) return <Showcase showcases={resource.data} />
      return <div> Error </div>
    }}
  />
)
