import { ReactNode } from 'react'
import clsx from 'clsx'

interface SmallOnlyProps {
  className?: string
  children: ReactNode
}

export const Span = ({ children, className }: SmallOnlyProps) => (
  <span className={clsx('inline', 'md:hidden', className)}>{children}</span>
)

export const SmallOnly = ({ children, className }: SmallOnlyProps) => (
  <div className={clsx('inline-block', 'md:hidden', className)}>{children}</div>
)

export default SmallOnly
