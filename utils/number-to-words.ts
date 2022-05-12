export const digit = (x: number): string => {
  return [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ][x]
}

export const capitalDigit = (x: number) => {
  const d = digit(x)
  return d.slice(0, 1).toUpperCase() + d.slice(1)
}
