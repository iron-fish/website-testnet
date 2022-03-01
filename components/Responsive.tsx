import { ReactNode } from 'react'
import clsx from 'clsx'

interface BasicProps {
  className?: string
  children: ReactNode
}

interface SmallProps extends BasicProps {
  defaultClassName?: string
}

export const SmallOnly = ({
  defaultClassName = 'inline-block',
  children,
  className,
}: SmallProps) => (
  <div className={clsx(defaultClassName, 'md:hidden', className)}>
    {children}
  </div>
)

export const Verbose = ({
  defaultClassName = 'md:inline-block',
  children,
  className,
}: SmallProps) => (
  <span className={clsx('hidden', defaultClassName, className)}>
    {children}
  </span>
)

export default Verbose
