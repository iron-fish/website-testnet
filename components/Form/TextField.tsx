import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Field, NameValue, WHITESPACE } from 'hooks/useForm'

import styles from './index.module.css'
import LabelledRow from './LabelledRow'

interface OptionsProps {
  disabled?: boolean
  groupName: string
  options: NameValue[]
  choice: string
  setChoice: Dispatch<SetStateAction<string>>
}

const RadioOptions = ({
  disabled = false,
  groupName,
  options,
  choice,
  setChoice,
}: OptionsProps) => (
  <div className={`flex ${styles.radioGroup} text-xs`}>
    {options.map(({ name, value }, idx) => {
      const checked = value === choice
      const activeClass = checked ? 'active' : 'inactive'
      const disabledClass = disabled ? styles.disabled : ''
      return (
        <label
          key={value}
          onClick={() => !disabled && setChoice(value)}
          className={`${styles.radioOption} ${activeClass} mr-2`}
        >
          <input
            className={styles.radioInput}
            disabled={disabled}
            type="radio"
            name={groupName}
            value={value}
            defaultChecked={checked}
            tabIndex={idx}
          />
          <span
            className={`${styles.radioFake} ${disabledClass} ${activeClass} bg-ifblue`}
          />
          <span>{name}</span>
        </label>
      )
    })}
  </div>
)

export interface ControlledField extends Field {
  controlled?: boolean
}

export const TextField = ({
  id,
  label,
  placeholder,
  errorText,
  defaultValue,
  valid,
  onChange,
  onKeyDown,
  onBlur,
  options = [],
  choice,
  setChoice,
  isRadioed,
  disabled,
  required = true,
  whitespace = WHITESPACE.DEFAULT,
  value,
  controlled = false,
  explanation = '',
}: ControlledField) => {
  const handleTrim = whitespace !== WHITESPACE.DEFAULT ? { onKeyDown } : {}
  const controller = controlled ? { value: value } : {}
  const inputProps = {
    ...handleTrim,
    ...controller,
    className: `${disabled ? 'bg-transparent' : ''}`,
    defaultValue,
    disabled,
    onBlur,
    onChange,
    id,
    type: 'text',
    placeholder,
  }
  return (
    <>
      <LabelledRow
        key={id}
        id={id}
        label={label}
        valid={valid}
        errorText={errorText}
        disabled={disabled}
        required={required}
      >
        {isRadioed && options.length > 0 && (
          <RadioOptions
            disabled={disabled}
            groupName={`${id}-group`}
            options={options}
            choice={choice}
            setChoice={setChoice}
          />
        )}
        <input {...inputProps} />
      </LabelledRow>
      {explanation && (
        <div
          className={clsx(
            'text-xs',
            'font-favorit',
            'text-left',
            'max-w-md',
            'w-full',
            'mt-1'
          )}
        >
          {explanation}
        </div>
      )}
    </>
  )
}
export default TextField
