import React from 'react'

import clsx from 'clsx'
import Logo from 'components/Logo'
import Menu from 'components/icons/Menu'
import { useNav, NavState } from 'hooks/useNav'

import NavbarLinks from './Links'
import NavbarFlyout from './Flyout'

type NavbarProps = {
  className?: string
  fill?: string
}

function Navbar({
  fill = 'white',
  className = 'bg-black text-white',
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
  }
  return (
    <nav
      className={`font-extended relative hover:bg-white hover:shadow-navbar hover:text-black ${
        $subnavState !== NavState.NONE ? 'bg-white text-black' : className
      }`}
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
          // md - 768px
          'text-sm',
          'px-5',
          'md:max-w-[768px]',
          // lg - 1024px
          'lg:text-[18px]',
          'lg:max-w-[1024px]',
          // 2lg - 1152px
          '2lg:px-10',
          '2lg:text-xl',
          '2lg:max-w-[1152px]',
          // 1440
          '1.5lg:px-16',
          // 1700
          '3xl:max-w-[1700px]',
        ])}
      >
        <div className="py-7">
          <Logo fill={fill} width={190} height={32}></Logo>
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
