import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { NamespacedResource } from '@async-resource/react-redux'

import withImageSrc from '../common/with-image-src'
import useImageSlider from '../../hooks/use-image-slider'
import { FullLoader } from '../load/Loader'
import { RaisedLinkButton } from '../common/buttons'
import { signature, green } from '../../constants/colors'
import { ArrowLeft, ArrowRight, Container as ContainerStyle } from '../common/image-slider'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.div`
  font-size: 32px;
  text-shadow: 1px 1px 4px ${signature};
  margin-bottom: 16px;
`
const ImageSliderContainer = styled(ContainerStyle)`
  width: 100%;
`
const Image = withImageSrc(
  styled.img`
    width: 70%;
    width: 70%;
    object-fit: cover;
    border-radius: 24px;
  `,
)
const Description = styled.div`
  margin-top: 16px;
  max-height: 150px;
  overflow-y: auto;
  max-width: 80%;
  padding: 0px 5%;
  font-size: 14px;
  text-align: justify;
`
const BuyTicketButton = styled(RaisedLinkButton)`
  color: white;
  background-color: ${green[0]};
  margin-top: 16px;
`

const Event = ({ id, name, description, images }) => {
  const [{ reference }, setImageIndex] = useImageSlider(images)
  return (
    <Container>
      <Title> { name } </Title>
      <ImageSliderContainer>
        <ArrowLeft onClick={setImageIndex(-1)} />
        <Image url={reference} alt="" />
        <ArrowRight onClick={setImageIndex(+1)} />
      </ImageSliderContainer>
      <Description> { description } </Description>
      <BuyTicketButton to={`/event/${id}/purchase`}> Buy Tickets Now </BuyTicketButton>
    </Container>
  )
}
Event.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    reference: PropTypes.string.isRequired,
  })).isRequired,
}

const EventResource = ({ match }) => {
  const { event } = match.params
  return (
    <NamespacedResource
      id="eventInfo"
      namespace={event}
      render={((resource) => {
        if (resource.loading) return <FullLoader />
        if (resource.loaded) return <Event {...resource.data} />
        return <div> Error </div>
      })}
    />
  )
}

EventResource.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      event: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default withRouter(EventResource)
