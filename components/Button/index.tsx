import { FC, MouseEventHandler } from 'react'

type ButtonProps = {
  colorClassName?: string
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  border?: string
}
export const RawButton: FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
  border = `border-2`,
  colorClassName = 'bg-black text-white hover:bg-transparent hover:text-black',
}) => {
  return (
    <button
      className={`
        flex 
        justify-center
        items-center
        font-extended
        rounded-full
        whitespace-nowrap
        transition
        border-black
        ${border}
        ${colorClassName}
        ${className}
    `}
      onClick={onClick}
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
}) => {
  return (
    <RawButton
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
