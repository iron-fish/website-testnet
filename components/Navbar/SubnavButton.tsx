import { ReactNode } from 'react'

export type SubnavButtonProps = {
  label: string
  className?: string
  isVisible: boolean
  toggle?: () => unknown
  children?: ReactNode
  condensed?: boolean
}

export const SubnavButton = ({
  label,
  isVisible,
  toggle,
  className,
  children,
  condensed = false,
}: SubnavButtonProps) => {
  const eventedProps = condensed
    ? { onClick: toggle }
    : { onMouseEnter: toggle }
  if (!condensed) {
    console.log({ eventedProps, label })
  }
  return (
    <>
      <button {...eventedProps} className={className}>
        <span
          className={`flex items-center justify-between h-full relative ${
            isVisible ? 'text-ifgray' : ''
          }`}
        >
          {label}
          <span
            className={`ml-2 text-black ${
              isVisible ? 'transform-gpu rotate-180' : ''
            }`}
          >
            ▾
          </span>
        </span>
      </button>
      {children}
    </>
  )
}

export default SubnavButton
