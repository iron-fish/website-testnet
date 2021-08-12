interface FormRowProps {
  className?: string
  valid: boolean
  children?: React.ReactNode
}

export const FormRow = ({ className = '', valid, children }: FormRowProps) => (
  <div
    className={`flex flex-col p-2 w-11/12 sm:w-7/12 mb-4 border-2 rounded-md border-solid ${
      valid ? 'border-black' : 'border-statusred'
    } ${className}`}
  >
    {children}
  </div>
)
export default FormRow
