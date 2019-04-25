import styled from 'styled-components'

export const FlatButton = styled.button`
  border: 1px solid transparent;
  outline: none;
  padding: 8px;
  font-size: 16px;
  background: transparent;
  cursor: pointer;

  :hover { opacity: 0.6 }
  :active {
    opacity: 0.3;
    border: 1px solid #0002;
  }
`

export const FlatIconButton = styled(FlatButton)`
  padding: 4px;
  font-size: 18px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
`
