import React from 'react'
import Link from 'next/link'

import Button from '../Button'
import Company from './Company'
import Testnet from './Testnet'
import Logo from '../Logo'
import Close from '../icons/Close'
import Menu from '../icons/Menu'

type NavbarProps = {
  className?: string
  fill?: string
}

type NavbarFlyoutProps = {
  flyoutVisible: boolean
  closeFlyout: () => unknown
}

type NavbarLinksProps = {
  className?: string
  companyClicked: () => unknown
  companyVisible?: boolean
  testnetClicked: () => unknown
  testnetVisible?: boolean
  selectedClassName?: string
}

function NavbarLinks({
  className = '',
  selectedClassName = 'absolute left-0 right-0 bottom-0 border-b-2 border-black',
  companyClicked,
  companyVisible = false,
  testnetClicked,
  testnetVisible = false,
}: NavbarLinksProps) {
  return (
    <>
      <Link href="https://ironfish.network/docs/onboarding/iron-fish-tutorial">
        <a className={className}>Get Started</a>
      </Link>
      <Link href="https://ironfish.network/docs/whitepaper/1_introduction">
        <a className={className}>Whitepaper</a>
      </Link>
      <button onClick={companyClicked} className={className}>
        <span
          className={`flex items-center h-full relative ${
            companyVisible ? 'text-ifgray' : ''
          }`}
        >
          Company
          <span
            className={`ml-2 text-black ${
              companyVisible ? 'transform-gpu rotate-180' : ''
            }`}
          >
            ▾
          </span>
          <span className={`${companyVisible ? selectedClassName : ''}`} />
        </span>
      </button>
      <span className={className}>|</span>
      <button onClick={testnetClicked} className={className}>
        <span
          className={`flex items-center h-full relative ${
            testnetVisible ? 'text-ifgray' : ''
          }`}
        >
          Testnet
          <span
            className={`ml-2 text-black ${
              testnetVisible ? 'transform-gpu rotate-180' : ''
            }`}
          >
            ▾
          </span>
          <span className={`${testnetVisible ? selectedClassName : ''}`} />
        </span>
      </button>
      <Button
        className="h-12 ml-4 py-3 px-6"
        colorClassName="bg-transparent text-black hover:bg-black hover:text-white"
      >
        <Link href="/login">
          <a>Testnet Login</a>
        </Link>
      </Button>
    </>
  )
}

function NavbarFlyout({ flyoutVisible, closeFlyout }: NavbarFlyoutProps) {
  return (
    <div
      className={`absolute h-screen w-screen bg-white text-black font-extended transition-all transform-gpu ${
        !flyoutVisible ? '-translate-x-full' : ''
      }`}
    >
      <div className="flex flex-col px-5">
        <div className="flex my-10 justify-between items-center">
          <div>
            <Logo fill="black" width={190} height={32} />
          </div>
          <button onClick={closeFlyout}>
            <Close />
          </button>
        </div>
        <NavbarLinks
          className="leading-relaxed text-4xl"
          companyClicked={() => {}}
          testnetClicked={() => {}}
        />
      </div>
    </div>
  )
}

function Navbar({
  fill = 'white',
  className = 'bg-black text-white',
}: NavbarProps) {
  const [flyoutVisible, setFlyoutVisible] = React.useState(false)
  const [subnavState, setSubnavState] = React.useState<
    null | 'testnet' | 'company'
  >(null)

  const companyVisible = subnavState === 'company'
  const testnetVisible = subnavState === 'testnet'

  React.useEffect(() => {
    if (flyoutVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }
  }, [flyoutVisible])

  return (
    <nav
      className={`font-extended relative hover:bg-white hover:shadow-navbar hover:text-black ${
        subnavState !== null ? 'bg-white text-black' : className
      }`}
    >
      <NavbarFlyout
        flyoutVisible={flyoutVisible}
        closeFlyout={() => setFlyoutVisible(false)}
      />
      <div className="flex items-stretch justify-between px-3 lg:px-16">
        <div className="py-7">
          <Logo fill={fill} width={190} height={32}></Logo>
        </div>
        <div className="hidden md:flex items-center lg:text-xl">
          <NavbarLinks
            className="px-3 lg:px-4.5 h-full flex items-center whitespace-nowrap"
            companyVisible={companyVisible}
            companyClicked={() =>
              setSubnavState(companyVisible ? null : 'company')
            }
            testnetVisible={testnetVisible}
            testnetClicked={() =>
              setSubnavState(testnetVisible ? null : 'testnet')
            }
          />
        </div>
        <button className="md:hidden" onClick={() => setFlyoutVisible(true)}>
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
