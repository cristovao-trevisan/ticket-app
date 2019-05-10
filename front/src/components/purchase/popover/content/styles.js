import styled from 'styled-components'
import { RaisedButton } from '../../../common/buttons'
import { green, gray, occupied, red } from '../../../../constants/colors'

export const Title = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
  font-weight: bold;
  text-align: center;
`
export const PriceContainer = styled(RaisedButton)`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 4px;
  background-color: ${green[2]};

  :disabled {
    background-color: ${gray[2]};
  }
`
export const PriceValue = styled.span`
  font-weight: bold;
`
export const PriceName = styled.span`
  margin-left: 8px;
`
export const NotAvailable = styled.span`
  font-weight: bold;
  color: ${occupied};
`
export const UnReserveButton = styled(RaisedButton)`
  display: flex;
  align-items: center;
  background-color: ${red[2]};
`
