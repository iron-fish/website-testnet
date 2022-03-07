import type { ReactNode } from 'react'
import clsx from 'clsx'

type AboutProps = {
  children: ReactNode
  className?: string
}
export const AboutHeader = ({ className, children }: AboutProps) => (
  <h2
    className={clsx(
      'text-3xl',
      'mb-8',
      'font-extended',
      'lg:text-4xl',
      'xl:text-5xl',
      className
    )}
  >
    {children}
  </h2>
)
