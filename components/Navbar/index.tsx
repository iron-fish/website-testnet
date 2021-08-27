import React from 'react'

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
    isCompanyVisible,
    isTestnetVisible,
    $flyoutVisible,
    $setFlyoutVisible,
    $subnavState,
    toggleNavCompany,
    toggleNavTestnet,
    hideNav,
  } = useNav()
  const companyVisible = isCompanyVisible()
  const testnetVisible = isTestnetVisible()
  const navBarLinksProps = {
    companyVisible,
    companyClicked: toggleNavCompany,
    testnetVisible,
    testnetClicked: toggleNavTestnet,
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
      <div className="flex items-stretch justify-between px-3 lg:px-10 lg2:px-16 max-w-menu m-auto">
        <div className="py-7">
          <Logo fill={fill} width={190} height={32}></Logo>
        </div>
        <div className="hidden md:flex items-center lg:text-xl">
          <NavbarLinks
            className="px-1.5 lg:px-3 h-full flex items-center whitespace-nowrap transition-font duration-300 transition-padding"
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
