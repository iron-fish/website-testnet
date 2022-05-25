/**
 * Adds an ordinal suffix to a given number, e.g. 1 -> 1st
 */
export function numberToOrdinal(num: number): string {
  // From https://stackoverflow.com/a/13627586
  const j = num % 10
  const k = num % 100

  if (j === 1 && k !== 11) {
    return `${num.toLocaleString()}st`
  }
  if (j == 2 && k != 12) {
    return `${num.toLocaleString()}nd`
  }
  if (j == 3 && k != 13) {
    return `${num.toLocaleString()}rd`
  }
  return `${num.toLocaleString()}th`
}
