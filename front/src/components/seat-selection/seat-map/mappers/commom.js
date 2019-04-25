export const pointToCoordinate = (point) => {
  const [, x, y] = /\((\d+) ?, ?(\d+)\)/.exec(point)

  return [Number(x), Number(y)]
}

export const areaDimensions = ({ locationStart, locationEnd, multiplier }) => {
  const [xi, yi] = pointToCoordinate(locationStart)
  const [xf, yf] = pointToCoordinate(locationEnd)
  const left = xi * multiplier
  const top = yi * multiplier
  const width = (xf - xi) * multiplier
  const height = (yf - yi) * multiplier
  return {
    popoverPosition: { top, left: left + width / 2 },
    style: {
      left, top, width, height,
    },
  }
}
