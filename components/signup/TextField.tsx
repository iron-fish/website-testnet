import LabelledRow from './LabelledRow'
import { Field } from '../../hooks/useForm'

export const TextField = ({
  id,
  label,
  placeholder,
  errorText,
  defaultValue,
  valid,
  onChange,
  onBlur,
}: Field) => (
  <LabelledRow
    key={id}
    id={id}
    label={label}
    valid={valid}
    errorText={errorText}
  >
    <input
      defaultValue={defaultValue}
      onBlur={onBlur}
      onChange={onChange}
      id={id}
      type="text"
      placeholder={placeholder}
    />
  </LabelledRow>
)
export default TextField
