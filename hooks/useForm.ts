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
  id: string
  label: string
  defaultValue: string
  validation: (v: string) => boolean
  placeholder?: string
  isRadioed?: boolean
  options?: NameValue[]
  defaultErrorText?: string
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

export function useField(provided: ProvidedField): Field | null {
  const [$value, $setter] = useState<string>(provided.defaultValue)
  // TODO: tried writing this with nullish coalescing but it yelled and I got tired
  const radioOption =
    provided &&
    provided.options &&
    provided.options[0] &&
    provided.options[0].value
  const { whitespace = WHITESPACE.DEFAULT } = provided
  const banSpaces = whitespace === WHITESPACE.BANNED
  const trimSpaces = banSpaces || whitespace === WHITESPACE.TRIMMED
  const [$choice, $setChoice] = useState<string>(
    provided.isRadioed && radioOption ? radioOption : ''
  )
  const [$disabled, $setDisabled] = useState<boolean>(false)
  const [$valid, $setValid] = useState<boolean>(false)
  const [$touched, $setTouched] = useState<boolean>(false)
  const [$field, $setField] = useState<Field | null>(null)
  const [$error, $setError] = useState<string>(provided.defaultErrorText || '')
  useEffect(() => {
    const { validation, defaultValue } = provided
    const valid = !$touched || ($touched && validation($value))
    $setValid(valid)
    $setField({
      ...provided,
      disabled: $disabled,
      setDisabled: $setDisabled,
      defaultValue,
      value: $value,
      valid,
      whitespace,
      setValid: $setValid,
      setter: $setter,
      onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
        if (banSpaces && e.key === ' ') {
          e.preventDefault()
        }
      },
      onChange: setStateOnChange($setter, trimSpaces),
      onBlur: () => {
        $setTouched(true)
      },
      setTouched: $setTouched,
      touched: $touched,
      errorText: valid ? undefined : $error,
      setError: $setError,
      choice: $choice,
      setChoice: $setChoice,
    })
  }, [
    $disabled,
    $setDisabled,
    provided,
    $value,
    $touched,
    $valid,
    $setValid,
    $error,
    $choice,
    $setChoice,
    whitespace,
    banSpaces,
    trimSpaces,
  ])
  return $field
}
