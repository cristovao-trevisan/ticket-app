import { useState } from 'react'
import styled from 'styled-components'
import { MdPlayArrow } from 'react-icons/md'
import { purple } from '../../constants/colors'

export const useImageSlider = (items) => {
  const [index, setIndexAction] = useState(0)
  const value = items[index]
  const setIndex = inc => () => {
    const newIndex = index + inc
    if (newIndex < 0 || newIndex === items.length) return
    setIndexAction(newIndex)
  }

  return [value, setIndex]
}

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
