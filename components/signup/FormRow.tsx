interface FormRowProps {
  className?: string
  valid: boolean
  children?: React.ReactNode
}

export const FormRow = ({ className = '', valid, children }: FormRowProps) => (
  <div
    className={`flex flex-col p-2 mt-3 w-11/12 sm:w-7/12 border rounded-md border-solid ${
      valid ? 'border-black' : 'border-alertred'
    } ${className}`}
  >
    {children}
  </div>
)
export default FormRow
