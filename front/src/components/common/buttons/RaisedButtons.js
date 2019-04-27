import styled from 'styled-components'
import shadows from '../../../styles/shadows'

export const RaisedButton = styled.button`
  border-radius: 4px;
  border: 0;
  outline: none;
  padding: 8px;
  font-size: ${props => props.size}px;
  cursor: pointer;
  background-color: white;
  ${shadows[1]}

  :hover {
    ${shadows[0]}
  }
  :active { box-shadow: none; }
`
