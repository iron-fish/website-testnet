import type { ReactNode } from 'react'

type AboutProps = {
  children: ReactNode
  className?: string
}
export const AboutHeader = ({ className, children }: AboutProps) => (
  <h2
    className={`text-2xl mt-24 mb-8 font-extended  md:text-3xl lg:text-4xl ${className}`}
  >
    {children}
  </h2>
)
