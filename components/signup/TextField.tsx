import type { ChangeEvent } from 'react'
import LabelledRow from './LabelledRow'

interface TextFieldProps {
  id: string
  label: string
  placeholder: string
  onBlur: () => void
  setter: (e: ChangeEvent) => void
  value: string
  touched: boolean
  valid: boolean
}
export const TextField = ({
  id,
  label,
  placeholder,
  value,
  valid,
  touched,
  setter,
  onBlur,
}: TextFieldProps) => (
  <LabelledRow
    id={id}
    label={label}
    valid={!touched || (touched && value !== 'UNSET' && valid)}
    errorText={
      id === 'email' ? 'Valid email address required' : 'This field is required'
    }
  >
    <input
      {...(touched ? { onClick: onBlur } : {})}
      onBlur={onBlur}
      onChange={setter}
      className="font-favorit"
      id={id}
      type="text"
      placeholder={placeholder}
    />
  </LabelledRow>
)
export default TextField
