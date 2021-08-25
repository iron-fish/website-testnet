import { useNav } from 'hooks/useNav'

import Logo from 'components/Logo'
import Menu from 'components/icons/Menu'

import NavbarFlyout from './Flyout'
import NavbarLinks from './Links'
import Company from './Company'
import Testnet from './Testnet'

export type NavbarProps = {
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
    isCompanyVisible,
    isTestnetVisible,
  } = useNav()
  const companyVisible = isCompanyVisible()
  const testnetVisible = isTestnetVisible()
  console.log({ $subnavState, companyVisible, testnetVisible })
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
          <NavbarLinks className="px-1.5 lg:px-3 h-full flex items-center whitespace-nowrap transition-font transition-fast transition-padding" />
        </div>
        <button className="md:hidden" onClick={() => $setFlyoutVisible(true)}>
          <Menu />
        </button>
      </div>
      {companyVisible ? (
        <div className="hidden md:flex">
          <Company />
        </div>
      ) : testnetVisible ? (
        <div className="hidden md:flex">
          <Testnet />
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
