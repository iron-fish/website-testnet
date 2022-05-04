import clsx from 'clsx'

interface FormRowProps {
  className?: string
  valid: boolean
  disabled: boolean
  children?: React.ReactNode
}

const getBorderColor = (valid: boolean, disabled: boolean) => {
  if (disabled) {
    return 'border-ifsubtextgray'
  } else if (!valid) {
    return 'border-alertred'
  }
  return 'border-black'
}

export const FormRow = ({
  className = '',
  valid,
  disabled,
  children,
}: FormRowProps) => {
  const borderColor = getBorderColor(valid, disabled)
  const textColor = disabled ? 'text-ifsubtextgray' : ''
  return (
    <div
      className={clsx(
        'font-favorit',
        'flex',
        'flex-col',
        'px-4',
        'py-3',
        'mt-4',
        'w-full',
        'border',
        'rounded-plus',
        'border-solid',
        'h-16',
        'max-h-16',
        'max-w-md',
        borderColor,
        textColor,
        className
      )}
    >
      {children}
    </div>
  )
}
export default FormRow
