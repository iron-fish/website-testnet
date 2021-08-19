import { useEffect, useState, ChangeEvent } from 'react'
import type { Dispatch, SetStateAction } from 'react'

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
}
export interface Field extends ProvidedField {
  value: string
  setter: Dispatch<SetStateAction<string>>
  setValid: Dispatch<SetStateAction<boolean>>
  onChange: (e: ChangeEvent) => void
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
  const radioOption =
    provided &&
    provided.options &&
    provided.options[0] &&
    provided.options[0].value
  const [$choice, $setChoice] = useState<string>(
    provided.isRadioed && radioOption ? radioOption : ''
  )

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
      defaultValue,
      value: $value,
      valid,
      setValid: $setValid,
      setter: $setter,
      onChange: (e: ChangeEvent) => {
        $setter((e.target as HTMLInputElement).value)
      },
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
    provided,
    $value,
    $touched,
    $valid,
    $setValid,
    $error,
    $choice,
    $setChoice,
  ])
  return $field
}

// export function useForm<T>(provided: ProvidedField<T>[]) {
//   const [$fields, $setFields] = useState<MutableRefObject<Field<T> | null>[]>(
//     []
//   )
//   useEffect(() => {
//     $setFields(provided.map(p => useField(p)))
//   }, [provided, $fields, $setFields])
//   return [$fields, $setFields]
// }
