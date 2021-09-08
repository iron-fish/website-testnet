import { ReactNode } from 'react'
import Disclosable from 'components/icons/Disclosable'
import clsx from 'clsx'

export type SubnavButtonProps = {
  children?: ReactNode
  className?: string
  condensed?: boolean
  enter?: () => unknown
  isVisible: boolean
  label: string
  toggle?: () => unknown
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
          className={clsx([
            `flex`,
            `items-center`,
            `justify-between`,
            `h-full`,
            `relative`,
            { 'text-ifgray': isVisible },
          ])}
        >
          {label}
          <span
            className={clsx([
              `ml-2`,
              `transition-transform`,
              `duration-500`,
              { 'transform-gpu -rotate-180': isVisible },
            ])}
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
