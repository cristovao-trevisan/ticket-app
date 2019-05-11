import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MdClear } from 'react-icons/md'
import { useActions } from 'react-redux'

import withEventSeatInfo from '../../hoc/with-event-seat-info'
import { Loader } from '../load/Loader'
import { red, purple } from '../../constants/colors'
import { FlatIconButton } from './buttons'
import { removeSeatFromCart as removeSeatFromCartAction } from '../../actions/thunk-actions'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  margin-bottom: 8px;
  border: 1px solid ${purple[2]};
  border-radius: 4px;
  padding: 8px;
  min-width: 250px;
`

const Title = styled.div`
  font-weight: bold;
`
const PriceName = styled.div`
  margin-left: 16px;
`
const PriceValue = styled.div`
  margin-left: 16px;
`
const RemoveButton = styled(FlatIconButton)`
  margin-left: 16px;
  color: ${red[0]};
  border-color: ${red[0]};
  border-style: solid;
`

const SelectedSeatInfo = ({ event, seatInfo, price, pricing, onPrice }) => {
  const removeSeatFromCart = useActions(s => removeSeatFromCartAction(s, 'numberedSeat'))
  const priceInfo = pricing.find(pr => pr.id === price)
  if (!priceInfo || !seatInfo) return <Loader />
  onPrice(priceInfo.price)
  return (
    <Container>
      <Title> { seatInfo.name } </Title>
      <PriceName> { priceInfo.name } </PriceName>
      <PriceValue> ${ priceInfo.price } </PriceValue>
      <RemoveButton size={14} onClick={() => removeSeatFromCart({ event, seat: seatInfo.id })}>
        <MdClear />
      </RemoveButton>
    </Container>
  )
}

SelectedSeatInfo.propTypes = {
  event: PropTypes.number.isRequired,
  seatInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
  }).isRequired,
  price: PropTypes.number,
  pricing: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  onPrice: PropTypes.func,
}
SelectedSeatInfo.defaultProps = {
  price: 0,
  onPrice: () => {},
}

export default withEventSeatInfo(SelectedSeatInfo)
