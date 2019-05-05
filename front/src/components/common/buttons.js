import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import shadows from '../../styles/shadows'

export const flatStyle = css`
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 4px;
  outline: none;
  padding: 8px;
  font-size: ${props => props.size}px;
  background: transparent;
  cursor: pointer;
  position: relative;
  
  :hover {
    opacity: 0.6;
  }
  :active {
    opacity: 0.3;
    border: 1px solid #6664;
  }
`

export const iconStyle = css`
  padding: 4px;
  font-size: ${props => props.size}px;
  width: ${props => props.size + 10}px;
  height: ${props => props.size + 10}px;
  border-radius: 50%;
`

export const raisedStyle = css`
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


// Flat buttons
export const FlatButton = styled.button`${flatStyle}`
export const FlatIconButton = styled(FlatButton)`${iconStyle}`
export const FlatLink = styled(Link)`${flatStyle}`

FlatButton.defaultProps = { size: 16 }
FlatLink.defaultProps = { size: 16 }
FlatIconButton.defaultProps = { size: 18 }

// Raised buttons
export const RaisedButton = styled.button`${raisedStyle}`
export const RaisedIconButton = styled(RaisedButton)`${iconStyle}`
export const RaisedLinkButton = styled(Link)`
  text-decoration: none;
  ${raisedStyle}
`

RaisedButton.defaultProps = { size: 16 }
RaisedLinkButton.defaultProps = { size: 16 }
RaisedIconButton.defaultProps = { size: 18 }
