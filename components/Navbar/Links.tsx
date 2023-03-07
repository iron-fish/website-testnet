import Link from 'next/link'
import clsx from 'clsx'

import { LoginContext } from 'hooks/useLogin'

import SubnavButton from './SubnavButton'
import LoginButton from './LoginButton'
import Company from './Company'
import Testnet from './Testnet'

type NavbarLinksProps = {
  showNotification?: boolean
  className?: string
  companyClicked?: () => unknown
  companyHovered?: () => unknown
  companyVisible?: boolean
  condensed?: boolean
  selectedClassName?: string
  testnetClicked?: () => unknown
  testnetHovered?: () => unknown
  testnetVisible?: boolean
  loginContext: LoginContext
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
  loginContext,
  showNotification = false,
}: NavbarLinksProps) {
  const itemPadding = [`px-2`, `lg:px-3.5`, `3xl:px-5`]
  const cc = clsx([className, ...itemPadding])
  const buttonStyles = { className: cc, selectedClassName }

  return (
    <>
      <Link href="https://ironfish.network/docs/onboarding/iron-fish-tutorial">
        <a className={cc}>Get Started</a>
      </Link>
      <Link href="https://ironfish.network/docs/whitepaper/1_introduction">
        <a className={cc}>Whitepaper</a>
      </Link>
      <Link href="https://ironfish.network/roadmap">
        <a className={cc}>Roadmap</a>
      </Link>
      <SubnavButton
        label="Company"
        {...buttonStyles}
        isVisible={companyVisible}
        toggle={companyClicked}
        enter={companyHovered}
        condensed={condensed}
      >
        {companyVisible && (
          <Company showNotification={showNotification} condensed={condensed} />
        )}
      </SubnavButton>
      <SubnavButton
        label="Testnet"
        {...buttonStyles}
        isVisible={testnetVisible}
        toggle={testnetClicked}
        enter={testnetHovered}
        condensed={condensed}
      >
        {testnetVisible && (
          <Testnet showNotification={showNotification} condensed={condensed} />
        )}
      </SubnavButton>
      <LoginButton loginContext={loginContext} />
    </>
  )
}
export default NavbarLinks
