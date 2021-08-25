import React from 'react'
import Link from 'next/link'

import Logo from 'components/Logo'
import Close from 'components/icons/Close'
import Menu from 'components/icons/Menu'
import { useNav, NavState } from 'hooks/useNav'

import Company from './Company'
import Testnet from './Testnet'
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
  // const [$flyoutVisible, $setFlyoutVisible] = React.useState(false)
  // const [$subnavState, $setSubnavState] = React.useState<
  //   null | 'testnet' | 'company'
  // >(null)

  // React.useEffect(() => {
  //   if ($flyoutVisible) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = 'initial'
  //   }
  // }, [$flyoutVisible])
  const { $flyoutVisible, $setFlyoutVisible, $subnavState, $setSubnavState } =
    useNav()
  const companyVisible = $subnavState === NavState.COMPANY
  const testnetVisible = $subnavState === NavState.TESTNET

  return (
    <nav
      className={`font-extended relative hover:bg-white hover:shadow-navbar hover:text-black ${
        $subnavState !== null ? 'bg-white text-black' : className
      }`}
    >
      <NavbarFlyout
        flyoutVisible={$flyoutVisible}
        closeFlyout={() => $setFlyoutVisible(false)}
      />
      <div className="flex items-stretch justify-between px-3 lg:px-10 lg2:px-16 max-w-menu m-auto">
        <div className="py-7">
          <Logo fill={fill} width={190} height={32}></Logo>
        </div>
        <div className="hidden md:flex items-center lg:text-xl">
          <NavbarLinks
            className="px-1.5 lg:px-3 h-full flex items-center whitespace-nowrap transition-font transition-fast transition-padding"
            companyVisible={companyVisible}
            companyClicked={() =>
              $setSubnavState(companyVisible ? null : NavState.COMPANY)
            }
            testnetVisible={testnetVisible}
            testnetClicked={() =>
              $setSubnavState(testnetVisible ? null : NavState.TESTNET)
            }
          />
        </div>
        <button className="md:hidden" onClick={() => $setFlyoutVisible(true)}>
          <Menu />
        </button>
      </div>
      {companyVisible && (
        <div className="hidden md:flex">
          <Company />
        </div>
      )}
      {testnetVisible && (
        <div className="hidden md:flex">
          <Testnet />
        </div>
      )}
    </nav>
  )
}

export default Navbar
