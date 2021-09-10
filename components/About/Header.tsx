import type { ReactNode } from 'react'

type AboutProps = {
  children: ReactNode
  className?: string
}
export const AboutHeader = ({ className, children }: AboutProps) => (
  <h2 className={`text-4xl mb-8 font-extended lg:text-5xl ${className}`}>
    {children}
  </h2>
)
