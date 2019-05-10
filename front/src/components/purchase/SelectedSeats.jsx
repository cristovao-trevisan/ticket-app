import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import SelectedSeatInfo from '../common/SelectedSeatInfo'
import { signature } from '../../constants/colors'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;  
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${signature};
  margin-top: 24px;
  margin-bottom: 16px;
`

const SelectedSeats = ({
  event,
  reservations, prices,
}) => {
  const uid = useSelector(state => state.login.data.uid)
  const seats = Object.entries(reservations)
    .filter(([, user]) => user === uid)
    .map(([rawSeat]) => Number(rawSeat))
  return (
    <Container>
      <Title> Selected Seats </Title>
      {seats.map(seat => (
        <SelectedSeatInfo
          key={`${seat}-${prices[seat]}`}
          seat={seat}
          event={event}
          price={prices[seat]}
        />
      ))}
    </Container>
  )
}

SelectedSeats.propTypes = {
  event: PropTypes.number.isRequired,
  reservations: PropTypes.shape({}).isRequired,
  prices: PropTypes.shape({}).isRequired,
}

export default SelectedSeats
