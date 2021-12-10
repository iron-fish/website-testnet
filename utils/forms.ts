import { ChangeEvent, Dispatch, SetStateAction } from 'react'

// naive validators

// reusable default value
export const UNSET = ''

// emails should have an @ sign and dot that isn't at the end
export const validateEmail = (x: string) => {
  const dot = x.indexOf('.')
  return x.indexOf('@') > 0 && dot > 0 && dot !== x.length - 1
}

// graffitis should be less than 32 bytes in length
export const validateGraffiti = (x: string) => {
  const graffitiUint8Array = new TextEncoder().encode(x)

  return graffitiUint8Array.length < 32
}

// non-zero width strings
export const exists = (x: string) => x.trim().length > 0

// reusable error text
export const defaultErrorText = `This field is required`

// take a setter and turn it into an event handler which sets
export function setStateOnChange(
  setter: Dispatch<SetStateAction<string>>,
  autotrim = false
) {
  return (e: ChangeEvent) => {
    const raw = (e.target as HTMLInputElement).value
    const toSet = autotrim ? raw.trim() : raw
    // eslint-disable-next-line no-console
    console.log({ autotrim, toSet })
    setter(toSet)
  }
}
