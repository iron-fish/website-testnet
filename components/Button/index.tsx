import { FC, MouseEventHandler, KeyboardEvent } from 'react'
import clsx from 'clsx'

type ButtonProps = {
  colorClassName?: string
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  onKeyPress?: (e: KeyboardEvent<HTMLButtonElement>) => void
  border?: string
  disabled?: boolean
  inverted?: boolean
}
export const RawButton: FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
  onKeyPress,
  disabled = false,
  border = `border-2`,
  inverted,
  colorClassName = inverted
    ? 'hover:bg-black hover:text-white bg-transparent text-black'
    : 'bg-black text-white hover:bg-transparent hover:text-black',
}) => {
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
  border,
  disabled = false,
  inverted,
  colorClassName = inverted
    ? 'hover:bg-black hover:text-white bg-transparent text-black'
    : 'bg-black text-white hover:bg-transparent hover:text-black',
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
