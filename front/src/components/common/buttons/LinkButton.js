import styled from 'styled-components'
import { blue } from '../../../constants/colors'

const LinkButton = styled.a`
  color: ${blue[0]};
  cursor: pointer;

  :hover { opacity: 0.6 }
  :active { opacity: 0.3; }
`

export default LinkButton
