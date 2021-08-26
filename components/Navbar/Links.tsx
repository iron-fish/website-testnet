// import { useNav, NavState } from 'hooks/useNav'
import Link from 'next/link'

import SubnavButton from './SubnavButton'
import LoginButton from './LoginButton'
import Company from './Company'
import Testnet from './Testnet'

type NavbarLinksProps = {
  className?: string
  companyClicked?: () => unknown
  companyVisible?: boolean
  testnetClicked?: () => unknown
  testnetVisible?: boolean
  selectedClassName?: string
  condensed?: boolean
}

export function NavbarLinks({
  className = '',
  selectedClassName = 'absolute left-0 right-0 bottom-0 border-b-2 border-black',
  companyClicked,
  companyVisible = false,
  testnetClicked,
  testnetVisible = false,
  condensed = false,
}: NavbarLinksProps) {
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
        isVisible={companyVisible}
        condensed
        toggle={companyClicked}
      >
        {condensed && companyVisible && (
          <div className="md:hidden">
            <Company condensed />
          </div>
        )}
      </SubnavButton>
      <SubnavButton
        label="Testnet"
        {...buttonStyles}
        isVisible={testnetVisible}
        condensed
        toggle={testnetClicked}
      >
        {condensed && testnetVisible && (
          <div className="md:hidden">
            <Testnet condensed />
          </div>
        )}
      </SubnavButton>
      <LoginButton />
    </>
  )
}
export default NavbarLinks
