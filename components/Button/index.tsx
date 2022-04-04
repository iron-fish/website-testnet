import { FC, MouseEventHandler, KeyboardEvent } from 'react'
import clsx from 'clsx'

type ButtonProps = {
  colorClassName?: string
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  onKeyPress?: (e: KeyboardEvent<HTMLButtonElement>) => void
  border?: string
  disabled?: boolean
}
export const RawButton: FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
  onKeyPress,
  disabled = false,
  border = `border-2`,
  colorClassName = 'bg-black text-white hover:bg-transparent hover:text-black',
}) => {
  // eslint-disable-next-line no-console
  console.log({ disabled })
  return (
    <button
      className={clsx(
        `flex`,
        `justify-center`,
        `items-center`,
        `font-extended`,
        `rounded-full`,
        `whitespace-nowrap`,
        `transition`,
        `border-black`,
        border,
        colorClassName,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      onClick={onClick}
      onKeyPress={onKeyPress}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const Button: FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
  colorClassName = 'bg-black text-white hover:bg-transparent hover:text-black',
  border,
  disabled = false,
}) => {
  return (
    <RawButton
      disabled={disabled}
      onClick={onClick}
      colorClassName={colorClassName}
      className={`p-4 h-10 ${className}`}
      border={border}
    >
      {children}
    </RawButton>
  )
}

export default Button
