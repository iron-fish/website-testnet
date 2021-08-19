import { ApiError } from './types'
export const KNOWN_ERRORS = {
  USER_EXISTS: {
    statusCode: 422,
    message: 'User already exists for',
    error: 'Unprocessable Entity',
  },
}

export const matchError = (x: ApiError) => {
  const matches = Object.entries(KNOWN_ERRORS).filter(
    ([_, v]) =>
      v.statusCode === x.statusCode &&
      x.message.includes(v.message) &&
      x.error === v.error
  )
  // it's a match! (signature target circles)
  if (matches.length > 0) return matches[0][0]
  return false
}
export const matchEntity = (x: string) =>
  x
    .slice(KNOWN_ERRORS.USER_EXISTS.message.length, Infinity)
    .trim()
    .replace(/["']/g, '')

export class LocalError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message)
    Object.setPrototypeOf(this, LocalError.prototype)
  }
}
