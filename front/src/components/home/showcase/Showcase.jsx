import React from 'react'
import PropTypes from 'prop-types'
import { Resource } from '@async-resource/react-redux'
import styled from 'styled-components'

import ShowcaseItem from './ShowcaseItem'
import useImageSlider from '../../../hooks/use-image-slider'
import { FullLoader } from '../../load/Loader'
import { ArrowLeft, ArrowRight, Container as ContainerStyle } from '../../common/image-slider'

const Container = styled(ContainerStyle)`
  margin-bottom: 48px;
`

const Showcase = ({ showcases }) => {
  const [event, setIndex] = useImageSlider(showcases)

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
