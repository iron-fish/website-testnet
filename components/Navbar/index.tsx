import React from "react"
import Link from "next/link"

import Logo from '../Logo'
import Close from '../icons/Close'
import Menu from '../icons/Menu'

type NavbarProps = {
  className?: string,
  fill?: string,
}

type NavbarFlyoutProps = {
  fill: string,
  flyoutVisible: boolean,
  closeFlyout: () => unknown,
}

function NavbarLinks({ className = "" }: { className?: string }) {
  return (
    <>
      <Link href="https://ironfish.network/docs/onboarding/iron-fish-tutorial">
        <a className={className}>Get started</a>
      </Link>
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

function NavbarFlyout({ fill, flyoutVisible, closeFlyout }: NavbarFlyoutProps) {
  return (
    <div className={`absolute h-screen w-screen bg-ifblue text-white font-extended transition-all transform-gpu ${!flyoutVisible ? '-translate-x-full' : ''}`}>
      <div className="flex flex-col px-5">
        <div className="flex my-10 justify-between items-center">
          <div><Logo fill={fill} width={190} height={32} /></div>
          <button onClick={closeFlyout}><Close /></button>
        </div>
        <NavbarLinks className="leading-relaxed text-4xl" />
      </div>
    </div>
  );
}

function Navbar({ fill = 'white', className = 'bg-black text-white' }: NavbarProps) { 

  const [ flyoutVisible, setFlyoutVisible ] = React.useState(false)

  React.useEffect(() => {
    if (flyoutVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }
  }, [flyoutVisible])

  return (
    <nav className={`font-extended ${className}`}>
      <NavbarFlyout fill={fill} flyoutVisible={flyoutVisible} closeFlyout={() => setFlyoutVisible(false)} />
      <div className="flex items-center justify-between px-3 lg:px-16 py-7">
        <div><Logo fill={fill} width={190} height={32}></Logo></div>
        <div className="hidden md:block lg:text-xl">
          <NavbarLinks className="px-3 lg:px-4 whitespace-nowrap" />
        </div>
        <button className="md:hidden" onClick={() => setFlyoutVisible(true)}>
          <Menu />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
