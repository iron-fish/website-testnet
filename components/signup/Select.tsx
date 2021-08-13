import LabelledRow from './LabelledRow'
import { NameValue, Field } from '../../hooks/useForm'

export const Select = ({
  id,
  options = [],
  label,
  errorText,
  valid,
  value,
  onChange,
}: Field) => (
  <LabelledRow id={id} label={label} valid={valid} errorText={errorText}>
    <select onChange={onChange} value={value}>
      {options.map(({ value, name }: NameValue) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  </LabelledRow>
)

export default Select
