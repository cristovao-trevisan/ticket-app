import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { signature } from '../../constants/colors'
import SelectedSeatInfo from '../common/SelectedSeatInfo'
import SelectedSeatAreaInfo from '../common/SelectedSeatAreaInfo'

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
  event, reservations, prices,
  seatAreasAmount,
}) => {
  const uid = useSelector(state => state.login.data.uid)

  const numberedSeats = Object.entries(reservations)
    .filter(([, user]) => user === uid)
    .map(([rawSeat]) => Number(rawSeat))


  return (
    <Container>
      <Title> Selected Seats </Title>
      {numberedSeats.map(seat => (
        <SelectedSeatInfo
          key={`${seat}-${prices[seat]}`}
          seat={seat}
          event={event}
          price={prices[seat]}
        />
      ))}
      {seatAreasAmount.map(([seat, amount]) => (
        <SelectedSeatAreaInfo
          key={Number(seat)}
          event={event}
          seat={Number(seat)}
          amount={amount}
        />
      ))}
    </Container>
  )
}

SelectedSeats.propTypes = {
  event: PropTypes.number.isRequired,
  reservations: PropTypes.shape({}).isRequired,
  prices: PropTypes.shape({}).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  seatAreasAmount: PropTypes.array.isRequired,
}

export default SelectedSeats
