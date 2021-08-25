import { useNav, NavState } from 'hooks/useNav'
import Link from 'next/link'

import SubnavButton from './SubnavButton'
import LoginButton from './LoginButton'

export type NavbarLinksProps = {
  className?: string
  toggleNavCompany?: () => unknown
  toggleNavTestnet?: () => unknown
  selectedClassName?: string
}

export function NavbarLinks({
  className = '',
  selectedClassName = 'absolute left-0 right-0 bottom-0 border-b-2 border-black',
}: NavbarLinksProps) {
  const {
    isCompanyVisible,
    isTestnetVisible,
    toggleNavCompany,
    toggleNavTestnet,
  } = useNav()
  const buttonStyles = { className, selectedClassName }

  return (
    <>
      <Link href="https://ironfish.network/docs/onboarding/iron-fish-tutorial">
        <a className={className}>Get Started</a>
      </Link>
      <Link href="https://ironfish.network/docs/whitepaper/1_introduction">
        <a className={className}>Whitepaper</a>
      </Link>
      <SubnavButton
        label="Company"
        {...buttonStyles}
        isVisible={isCompanyVisible()}
        onMouseOver={toggleNavCompany}
      />
      <SubnavButton
        label="Testnet"
        {...buttonStyles}
        isVisible={isTestnetVisible()}
        onMouseOver={toggleNavTestnet}
      />
      <LoginButton />
    </>
  )
}
export default NavbarLinks
