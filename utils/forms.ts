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

// https://stackoverflow.com/questions/209732/why-am-i-seeing-inconsistent-javascript-logic-behavior-looping-with-an-alert-v
const alphaNumericHyphensOnly = new RegExp('[A-Za-z\\d-]+')
export const validateGithub = (x: string) => {
  if (x === UNSET) return true
  const length = (x || UNSET).trim().length
  const output = length > 0 && length < 40 && alphaNumericHyphensOnly.test(x)
  // eslint-disable-next-line no-console
  console.log({ x, output })
  return output
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
