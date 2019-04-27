import styled from 'styled-components'


export const FlatButton = styled.button`
  border: 1px solid transparent;
  border-radius: 4px;
  outline: none;
  padding: 8px;
  font-size: ${props => props.size}px;
  background: transparent;
  cursor: pointer;

  :hover { background-color: #fff2 }
  :active {
    opacity: 0.3;
    border: 1px solid #0002;
  }
`

export const FlatIconButton = styled(FlatButton)`
  padding: 4px;
  font-size: ${props => props.size}px;
  width: ${props => props.size + 10}px;
  height: ${props => props.size + 10}px;
  border-radius: 50%;
`

FlatButton.defaultProps = { size: 16 }
FlatIconButton.defaultProps = { size: 18 }
