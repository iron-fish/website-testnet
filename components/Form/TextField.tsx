import styles from './index.module.css'
import { Dispatch, SetStateAction } from 'react'
import { Field, NameValue } from 'hooks/useForm'
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

export const TextField = ({
  id,
  label,
  placeholder,
  errorText,
  defaultValue,
  valid,
  onChange,
  onBlur,
  options = [],
  choice,
  setChoice,
  isRadioed,
  disabled,
}: Field) => (
  <LabelledRow
    key={id}
    id={id}
    label={label}
    valid={valid}
    errorText={errorText}
    disabled={disabled}
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
    <input
      className={`${disabled ? 'bg-transparent' : ''}`}
      defaultValue={defaultValue}
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
      id={id}
      type="text"
      placeholder={placeholder}
    />
  </LabelledRow>
)
export default TextField
