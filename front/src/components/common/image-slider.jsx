import styled from 'styled-components'
import { MdPlayArrow } from 'react-icons/md'
import { purple } from '../../constants/colors'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ArrowRight = styled(MdPlayArrow)`
  min-width: 48px;
  font-size: 48px;
  color: ${purple[1]};
  cursor: pointer;
`
export const ArrowLeft = styled(ArrowRight)`transform: rotate(180deg);`
