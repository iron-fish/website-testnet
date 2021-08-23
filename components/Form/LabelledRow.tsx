import FormRow from './FormRow'
import { FieldError } from './FieldStatus'

interface LabelledRowProps {
  id: string
  label?: string
  required?: boolean
  valid: boolean
  errorText?: string
  children?: React.ReactNode
}

export const LabelledRow = ({
  id,
  label = '',
  children,
  valid,
  required = true,
  errorText = 'This field is required',
}: LabelledRowProps) => (
  <>
    <FormRow valid={valid}>
      {label.length > 0 && (
        <label htmlFor={id} className="text-xs mb-px3">
          {label}
          {required && <span className="text-md text-gray-500">*</span>}
        </label>
      )}
      {children}
    </FormRow>
    {!valid && <FieldError text={errorText} />}
  </>
)

export default LabelledRow
