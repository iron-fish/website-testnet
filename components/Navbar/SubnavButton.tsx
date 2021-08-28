import { ReactNode } from 'react'
import Disclosable from 'components/icons/Disclosable'

export type SubnavButtonProps = {
  label: string
  className?: string
  isVisible: boolean
  toggle?: () => unknown
  enter?: () => unknown
  children?: ReactNode
  condensed?: boolean
}

export const SubnavButton = ({
  label,
  isVisible,
  toggle,
  enter,
  className,
  children,
  condensed = false,
}: SubnavButtonProps) => {
  const eventedProps = condensed ? { onClick: toggle } : { onMouseEnter: enter }
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
            className={`ml-2 transition-transform duration-500 ${
              isVisible ? 'transform-gpu -rotate-180' : ''
            }`}
          >
            <Disclosable className="w-6 md:w-4" />
          </span>
        </span>
      </button>
      {children}
      {condensed && label === 'Testnet' && !children && (
        <div className="w-full h-12" />
      )}
    </>
  )
}

export default SubnavButton
