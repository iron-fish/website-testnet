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
  colorClassName = 'bg-black text-white hover:bg-transparent hover:text-black',
  border = '-2',
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
        border${border}
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
}) => {
  return (
    <RawButton
      onClick={onClick}
      colorClassName={colorClassName}
      className={`p-4 h-10 ${className}`}
    >
      {children}
    </RawButton>
  )
}

export default Button
