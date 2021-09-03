import Link from 'next/link'

import SubnavButton from './SubnavButton'
import LoginButton from './LoginButton'
import Company from './Company'
import Testnet from './Testnet'

type NavbarLinksProps = {
  className?: string
  companyClicked?: () => unknown
  companyHovered?: () => unknown
  companyVisible?: boolean
  condensed?: boolean
  selectedClassName?: string
  testnetClicked?: () => unknown
  testnetHovered?: () => unknown
  testnetVisible?: boolean
}

export function NavbarLinks({
  className = '',
  companyClicked,
  companyHovered,
  companyVisible = false,
  condensed,
  selectedClassName = 'absolute left-0 right-0 bottom-0 border-b-2 border-black',
  testnetClicked,
  testnetHovered,
  testnetVisible = false,
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
        toggle={companyClicked}
        enter={companyHovered}
        condensed={condensed}
      >
        {companyVisible && <Company condensed={condensed} />}
      </SubnavButton>
      <SubnavButton
        label="Testnet"
        {...buttonStyles}
        isVisible={testnetVisible}
        toggle={testnetClicked}
        enter={testnetHovered}
        condensed={condensed}
      >
        {testnetVisible && <Testnet condensed={condensed} />}
      </SubnavButton>
      <LoginButton />
    </>
  )
}
export default NavbarLinks
