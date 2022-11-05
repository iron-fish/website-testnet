import { ReactType, ReactElement } from 'react'
import clsx from 'clsx'

import Logo from 'components/Logo'
import Menu from 'components/icons/Menu'
import { useNav, NavState } from 'hooks/useNav'
import { LoginContext } from 'hooks/useLogin'

import NavbarLinks from './Links'
import NavbarFlyout from './Flyout'

import Link from 'next/link'

type NavbarProps = {
  className?: string
  fill?: string
  loginContext: LoginContext
  showNotification: boolean
  notification?: ReactElement | ReactType
}

function Navbar({
  fill = 'white',
  className = 'bg-black text-white',
  loginContext,
  showNotification,
}: NavbarProps) {
  const notification = showNotification ? (
    <>
      Phase 2 Incentivized Testnet started May 10th @ 12:00 PDT and will end November 15th!
      <br className="md:hidden" />
      <span className="hidden md:inline"> </span>
      See the Testnet tab for more details.
    </>
  ) : null
  const {
    $flyoutVisible,
    $setFlyoutVisible,
    $subnavState,
    enterNavCompany,
    enterNavTestnet,
    hideNav,
    isCompanyVisible,
    isTestnetVisible,
    toggleNavCompany,
    toggleNavTestnet,
  } = useNav()
  const companyVisible = isCompanyVisible()
  const testnetVisible = isTestnetVisible()
  const navBarLinksProps = {
    showNotification,
    companyClicked: toggleNavCompany,
    companyHovered: enterNavCompany,
    companyVisible,
    testnetClicked: toggleNavTestnet,
    testnetHovered: enterNavTestnet,
    testnetVisible,
    loginContext,
  }
  return (
    <nav
      className={clsx(
        `font-extended`,
        `relative`,
        `hover:bg-white`,
        `hover:shadow-navbar`,
        `hover:text-black`,
        $subnavState !== NavState.NONE ? 'bg-white text-black' : className
      )}
      onMouseLeave={() => {
        if (!$flyoutVisible) {
          hideNav()
        }
      }}
    >
      {notification && (
        <div
          className={clsx(
            'bg-black',
            'text-white',
            'block',
            'h-[4rem]',
            'font-favorit',
            'text-center',
            'text-xs',
            'md:text-sm',
            'pt-5'
          )}
        >
          {notification}
        </div>
      )}
      <NavbarFlyout
        flyoutVisible={$flyoutVisible}
        closeFlyout={() => $setFlyoutVisible(false)}
        {...navBarLinksProps}
      />
      <div
        className={clsx([
          'transition-width',
          'delay-300',
          'flex',
          'items-stretch',
          'justify-between',
          'm-auto',
          'max-w-[72rem]',
          'text-sm',
          'px-5',
        ])}
      >
        <div className="py-7">
          <Link href="http://ironfish.network/" passHref>
            <a>
              <Logo fill={fill} width={190} height={32}></Logo>
            </a>
          </Link>
        </div>
        <div
          className={clsx(
            'hidden',
            'tablet:flex',
            'items-center',
            '2lg:text-lg'
          )}
        >
          <NavbarLinks
            className={clsx(
              'h-full',
              'flex',
              'items-center',
              'whitespace-nowrap',
              'transition-font',
              'transition-fast',
              'transition-padding'
            )}
            {...navBarLinksProps}
          />
        </div>
        <button
          className="tablet:hidden"
          onClick={() => $setFlyoutVisible(true)}
        >
          <Menu />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
