import React from 'react'
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
}

function Navbar({
  fill = 'white',
  className = 'bg-black text-white',
  loginContext,
}: NavbarProps) {
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
          'max-w-[1700px]',
          // md - 768px
          'text-sm',
          'px-5',
          // lg - 1024px
          'lg:text-[18px]',
          // 2lg - 1152px
          '2lg:px-10',
          '2lg:text-xl',
          // 1440
          '1.5lg:px-16',
        ])}
      >
        <div className="py-7">
          <Link href="http://ironfish.network/" passHref>
            <a>
              <Logo fill={fill} width={190} height={32}></Logo>
            </a>
          </Link>
        </div>
        <div className="hidden md:flex items-center lg:text-xl">
          <NavbarLinks
            className="h-full flex items-center whitespace-nowrap transition-font transition-fast transition-padding"
            {...navBarLinksProps}
          />
        </div>
        <button className="md:hidden" onClick={() => $setFlyoutVisible(true)}>
          <Menu />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
