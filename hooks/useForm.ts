import {
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
} from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { setStateOnChange } from 'utils/forms'

export enum WHITESPACE {
  DEFAULT = 'DEFAULT',
  BANNED = 'BANNED',
  TRIMMED = 'TRIMMED',
}

export interface NameValue {
  name: string
  value: string
}

export interface ProvidedField {
  defaultErrorText?: string
  useDefault?: boolean
  defaultLabel?: string
  defaultValue: string
  id: string
  isRadioed?: boolean
  label: string
  options?: NameValue[]
  placeholder?: string
  radioOption?: string
  required?: boolean
  touched?: boolean
  validation: (v: string) => boolean
  whitespace?: WHITESPACE
}
export interface Field extends ProvidedField {
  value: string
  disabled: boolean
  setDisabled: Dispatch<SetStateAction<boolean>>
  setter: Dispatch<SetStateAction<string>>
  setValid: Dispatch<SetStateAction<boolean>>
  onChange: (e: ChangeEvent) => void
  onKeyDown: KeyboardEventHandler<HTMLInputElement>
  onBlur: () => void
  valid: boolean
  setTouched: Dispatch<SetStateAction<boolean>>
  touched: boolean
  errorText?: string
  setError: Dispatch<SetStateAction<string>>
  choice: string
  setChoice: Dispatch<SetStateAction<string>>
}
/*
// eslint-disable-next-line
type Predicate = (x: any) => boolean

const sometimes = (limit: number, predicate: Predicate) => {
  let x = 0
  // eslint-disable-next-line
  function inner(whatever: any) {
    x += 1
    if (x < limit && predicate(whatever)) {
      // eslint-disable-next-line
      console.log(JSON.stringify(whatever, null, 2))
    }
  }
  return inner
}
*/

export function useField(provided: ProvidedField): Field | null {
  const {
    defaultErrorText = '',
    defaultLabel = '',
    defaultValue,
    id,
    isRadioed,
    label,
    options,
    radioOption: defaultRadioOption,
    required = true,
    touched = false,
    validation,
    whitespace = WHITESPACE.DEFAULT,
  } = provided
  const [$value, $setter] = useState<string>(defaultValue)
  // TODO: tried writing this with nullish coalescing but it yelled and I got tired
  const radioOption =
    defaultRadioOption || (options && options[0] && options[0].value)
  const banSpaces = whitespace === WHITESPACE.BANNED
  const trimSpaces = banSpaces || whitespace === WHITESPACE.TRIMMED
  const [$choice, $setChoice] = useState<string>(
    isRadioed && radioOption ? radioOption : ''
  )
  const [$disabled, $setDisabled] = useState<boolean>(false)
  const [, $setValid] = useState<boolean>(false)
  const [$touched, $setTouched] = useState<boolean>(touched)
  const [$field, $setField] = useState<Field | null>(null)
  const [$error, $setError] = useState<string>(defaultErrorText)
  useEffect(() => {
    const valid = !$touched || ($touched && validation($value))
    $setValid(valid)
    $setField({
      // raw values from upstream
      defaultErrorText,
      defaultValue,
      defaultLabel,
      id,
      isRadioed,
      label,
      radioOption: defaultRadioOption,
      options,
      valid,
      validation,
      whitespace,
      // dynamic values
      choice: $choice,
      disabled: $disabled,
      errorText: valid ? undefined : $error,
      onChange: setStateOnChange($setter, trimSpaces),
      setChoice: $setChoice,
      setDisabled: $setDisabled,
      setError: $setError,
      setTouched: $setTouched,
      setValid: $setValid,
      setter: $setter,
      touched: $touched,
      value: $value,
      required,
      // callback functions
      onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
        if (banSpaces && e.key === ' ') {
          e.preventDefault()
        }
      },
      onBlur: () => {
        $setTouched(true)
      },
    })
  }, [
    defaultLabel,
    defaultErrorText,
    defaultRadioOption,
    isRadioed,
    options,
    id,
    label,
    validation,
    required,
    defaultValue,
    whitespace,
    banSpaces,
    trimSpaces,
    $disabled,
    $value,
    $touched,
    $error,
    $choice,
  ])
  return $field
}
