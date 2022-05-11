export const digit = (x: number): string => {
  if (x === 9) {
    return 'nine'
  }
  if (x === 8) {
    return 'eight'
  }
  if (x === 7) {
    return 'seven'
  }
  if (x === 6) {
    return 'six'
  }
  if (x === 5) {
    return 'five'
  }
  if (x === 4) {
    return 'four'
  }
  if (x === 3) {
    return 'three'
  }
  if (x === 2) {
    return 'two'
  }
  return 'one'
}

export const capitalDigit = (x: number) => {
  const d = digit(x)
  return d.slice(0, 1).toUpperCase() + d.slice(1)
}
