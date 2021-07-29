import React from "react"
import Link from "next/link"

import GetStarted from './GetStarted'
import Logo from '../Logo'
import Close from '../icons/Close'
import Menu from '../icons/Menu'

type NavbarProps = {
  className?: string,
  fill?: string,
}

type NavbarFlyoutProps = {
  flyoutVisible: boolean,
  closeFlyout: () => unknown,
}

type NavbarLinksProps = {
  className?: string,
  getStartedClassName?: string,
  getStartedClicked: () => unknown,
  getStartedVisible?: boolean,
}

function NavbarLinks({ className = "", getStartedClassName = "absolute left-0 right-0 bottom-0 border-b-2 border-black", getStartedClicked, getStartedVisible = false }: NavbarLinksProps) {
  return (
    <>
      <button onClick={getStartedClicked} className={className}>
        <span className="flex items-center h-full relative">Get Started<span className={`${getStartedVisible ? getStartedClassName : ''}`}></span></span>
      </button>
      <Link href="https://ironfish.network/docs/whitepaper/1_introduction">
        <a className={className}>Whitepaper</a>
      </Link>
      <Link href="https://ironfish.network/about/">
        <a className={className}>About Us</a>
      </Link>
      <Link href="https://ironfish.network/careers/">
        <a className={className}>Careers</a>
      </Link>
      <Link href="https://ironfish.network/faq/">
        <a className={className}>FAQ</a>
      </Link>
      <Link href="https://ironfish.network/blog">
        <a className={className}>Blog</a>
      </Link>
    </>
  );
}

function NavbarFlyout({ flyoutVisible, closeFlyout }: NavbarFlyoutProps) {
  return (
    <div className={`absolute h-screen w-screen bg-white text-black font-extended transition-all transform-gpu ${!flyoutVisible ? '-translate-x-full' : ''}`}>
      <div className="flex flex-col px-5">
        <div className="flex my-10 justify-between items-center">
          <div><Logo fill="black" width={190} height={32} /></div>
          <button onClick={closeFlyout}><Close /></button>
        </div>
        <NavbarLinks className="leading-relaxed text-4xl" getStartedClicked={() => {}} />
      </div>
    </div>
  );
}

function Navbar({ fill = 'white', className = 'bg-black text-white' }: NavbarProps) { 
  const [flyoutVisible, setFlyoutVisible] = React.useState(false)
  const [getStartedVisible, setGetStartedVisible] = React.useState(false)

  React.useEffect(() => {
    if (flyoutVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }
  }, [flyoutVisible])

  return (
    <nav className={`font-extended ${className}`}>
      <NavbarFlyout flyoutVisible={flyoutVisible} closeFlyout={() => setFlyoutVisible(false)} />
      <div className="flex items-stretch justify-between px-3 lg:px-16">
        <div className="py-7"><Logo fill={fill} width={190} height={32}></Logo></div>
        <div className="hidden md:flex items-center lg:text-xl">
          <NavbarLinks className="px-3 lg:px-4 h-full flex items-center whitespace-nowrap" getStartedVisible={getStartedVisible} getStartedClicked={() => setGetStartedVisible(!getStartedVisible)} />
        </div>
        <button className="md:hidden" onClick={() => setFlyoutVisible(true)}>
          <Menu />
        </button>
      </div>
      {getStartedVisible && <div className="hidden md:flex"><GetStarted /></div>}
    </nav>
  );
}

export default Navbar;
