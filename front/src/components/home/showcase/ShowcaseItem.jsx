import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

const Container = styled.div`
  width: 80%;
  max-width: 400px;
  max-height: 300px;
`
const Image = styled.img`
  object-fit: cover;
  border-radius: 32px;
  width: 100%;
`

const ShowcaseItem = ({ id, name, image }) => (
  <Container>
    <Image src={image} data-tip onClick={() => console.log({ id })} />
    <ReactTooltip> { name } </ReactTooltip>
  </Container>
)

ShowcaseItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}

export default ShowcaseItem
