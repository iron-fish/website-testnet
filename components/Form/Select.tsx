import { NameValue, Field } from 'hooks/useForm'
import LabelledRow from './LabelledRow'

interface SelectField extends Field {
  noDefault?: boolean
  defaultLabel?: string
}

export const Select = ({
  options = [],
  noDefault = false,
  defaultLabel = '',
  defaultValue,
  value,
  onChange,
  setTouched,
}: SelectField) => {
  const allOptions = noDefault
    ? [{ name: defaultLabel, value: defaultValue }].concat(options)
    : options
  return (
    <select
      className="bg-transparent"
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
  )
}

export const LabelledSelect = (props: SelectField) => {
  const { id, label, errorText, valid } = props

  return (
    <LabelledRow id={id} label={label} valid={valid} errorText={errorText}>
      <Select {...props} />
    </LabelledRow>
  )
}

export default LabelledSelect
