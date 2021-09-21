import type { ReactNode } from 'react'
import Link from 'next/link'

interface BasicLinkProps {
  href: string
  children: ReactNode
  className?: string
}
export const StyledLink = ({ className, href, children }: BasicLinkProps) => (
  <span className={className}>
    <Link href={href}>{children}</Link>
  </span>
)

export const BasicLink = ({
  href,
  children,
  className = '',
}: BasicLinkProps) => (
  <StyledLink
    className={`font-extended border-b border-black ${className}`}
    href={href}
  >
    {children}
  </StyledLink>
)

export default BasicLink
