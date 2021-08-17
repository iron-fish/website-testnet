interface FormRowProps {
  className?: string
  valid: boolean
  children?: React.ReactNode
}

export const FormRow = ({ className = '', valid, children }: FormRowProps) => (
  <div
    className={`font-favorit flex flex-col px-2 py-3 mt-3 w-full border rounded-plus border-solid h-16 max-h-16 max-w-md ${
      valid ? 'border-black' : 'border-alertred'
    } ${className}`}
  >
    {children}
  </div>
)
export default FormRow
