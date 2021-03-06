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
  controlled?: boolean
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
  value?: string
  explanation?: string
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
    validation,
    whitespace = WHITESPACE.DEFAULT,
    placeholder,
    useDefault,
    controlled,
    touched: _touched = false,
    explanation,
  } = provided
  const touched = defaultValue ? true : _touched
  const initiallyValid = defaultValue ? validation(defaultValue) : false
  const [$value, $setter] = useState<string>(defaultValue)
  const radioOption =
    defaultRadioOption || (options && options[0] && options[0].value)
  const banSpaces = whitespace === WHITESPACE.BANNED
  const trimSpaces = banSpaces || whitespace === WHITESPACE.TRIMMED
  const [$choice, $setChoice] = useState<string>(
    isRadioed && radioOption ? radioOption : ''
  )
  const [$disabled, $setDisabled] = useState<boolean>(false)
  const [$valid, $setValid] = useState<boolean>(initiallyValid)
  const [$touched, $setTouched] = useState<boolean>(touched)
  const [$field, $setField] = useState<Field | null>(null)
  const [$error, $setError] = useState<string>(defaultErrorText)
  useEffect(() => {
    if (defaultValue) {
      $setTouched(true)
    }
  }, [defaultValue])
  useEffect(() => {
    const valid = !$touched || ($touched && validation($value))
    $setValid(valid)
  }, [$touched, validation, $value])
  useEffect(() => {
    $setField({
      // raw values from upstream
      defaultErrorText,
      defaultValue,
      defaultLabel,
      explanation,
      id,
      isRadioed,
      label,
      radioOption: defaultRadioOption,
      options,
      valid: $valid,
      validation,
      whitespace,
      placeholder,
      useDefault,
      // dynamic values
      choice: $choice,
      disabled: $disabled,
      errorText: $valid ? undefined : $error,
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
      controlled,
    })
  }, [
    $valid,
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
    placeholder,
    useDefault,
    controlled,
    explanation,
  ])
  return $field
}
