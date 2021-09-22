import { NameValue, Field } from 'hooks/useForm'
import styles from './Select.module.css'
import LabelledRow from './LabelledRow'

interface SelectField extends Field {
  useDefault?: boolean
  defaultLabel?: string
  className?: string
}

export const Select = ({
  disabled,
  options = [],
  useDefault = false,
  defaultLabel = '',
  defaultValue,
  value,
  onChange,
  setTouched,
  className,
}: SelectField) => {
  const allOptions = useDefault
    ? [{ name: defaultLabel, value: defaultValue }].concat(options)
    : options
  return (
    <div
      className={`${styles.customSelectWrapper} ${
        disabled ? styles.disabled : ''
      }`}
    >
      <select
        className={`${styles.customSelect} bg-transparent ${className || ''}`}
        disabled={disabled}
        onChange={e => {
          onChange(e)
          setTouched(true)
        }}
        value={value}
      >
        {allOptions.map(({ value: option, name }: NameValue) => (
          <option key={option} value={option}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}

export const LabelledSelect = (props: SelectField) => {
  const { id, label, errorText, valid, disabled } = props

  return (
    <LabelledRow
      id={id}
      label={label}
      valid={valid}
      errorText={errorText}
      disabled={disabled}
    >
      <Select {...props} />
    </LabelledRow>
  )
}

export default LabelledSelect
