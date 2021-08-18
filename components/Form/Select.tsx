import LabelledRow from './LabelledRow'
import { NameValue, Field } from '../../hooks/useForm'

interface SelectField extends Field {
  noDefault?: boolean
  defaultLabel?: string
}

export const Select = ({
  id,
  options = [],
  noDefault = false,
  defaultLabel = '',
  label,
  errorText,
  defaultValue,
  valid,
  value,
  onChange,
  setTouched,
}: SelectField) => {
  const allOptions = noDefault
    ? [{ name: defaultLabel, value: defaultValue }].concat(options)
    : options
  return (
    <LabelledRow id={id} label={label} valid={valid} errorText={errorText}>
      <select
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
    </LabelledRow>
  )
}

export default Select
