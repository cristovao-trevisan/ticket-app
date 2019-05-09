import { useState } from 'react'

export default (items) => {
  const [index, setIndexAction] = useState(0)
  const value = items[index]
  const setIndex = inc => () => {
    const newIndex = index + inc
    if (newIndex < 0 || newIndex === items.length) return
    setIndexAction(newIndex)
  }

  return [value, setIndex]
}
