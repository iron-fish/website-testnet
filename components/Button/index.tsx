import React from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
  colorClassName?: string
}
export function RawButton({
  children,
  className = '',
  colorClassName = 'bg-black text-white hover:bg-transparent hover:text-black',
}: Props) {
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
        border-2
        ${colorClassName}
        ${className}
    `}
    >
      {children}
    </button>
  )
}

function Button({
  children,
  className = '',
  colorClassName = 'bg-black text-white hover:bg-transparent hover:text-black',
}: Props) {
  return (
    <RawButton
      colorClassName={colorClassName}
      className={`p-4 h-10 ${className}`}
    >
      {children}
    </RawButton>
  )
}

export default Button
