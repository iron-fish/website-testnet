import { ReactNode } from 'react'
import clsx from 'clsx'

interface VerboseProps {
  className?: string
  children: ReactNode
}

export const Verbose = ({ children, className }: VerboseProps) => (
  <span className={clsx('hidden', 'md:inline', className)}>{children}</span>
)

export default Verbose
