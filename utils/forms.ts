import { ChangeEvent, Dispatch, SetStateAction } from 'react'
export { WHITESPACE } from 'hooks/useForm'
import { Field } from 'hooks/useForm'

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

const alphaNumericHyphensOnly = /[A-Za-z\d-]+/g
export const validateGithub = (x: string) => {
  const length = new TextEncoder().encode(x.trim()).length
  const valid = length > 0 && length < 40 && alphaNumericHyphensOnly.test(x)
  // eslint-disable-next-line no-console
  console.log({ length, x, test: alphaNumericHyphensOnly.test(x), valid })
  return valid
}

// non-zero width strings
export const exists = (x: string) => x.trim().length > 0

// reusable error text
export const defaultErrorText = `This field is required`

// take a setter and turn it into an event handler which sets
export function setStateOnChange(
  setter: Dispatch<SetStateAction<string>>,
  trim = false
) {
  return (e: ChangeEvent) => {
    const raw = (e.target as HTMLInputElement).value
    const toSet = trim ? raw.trim() : raw
    setter(toSet)
  }
}

export function resetTextField($field: Field) {
  $field.defaultValue = $field.value || UNSET
  return $field
}
