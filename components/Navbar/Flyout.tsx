import Logo from 'components/Logo'
import Close from 'components/icons/Close'
import NavbarLinks from './Links'

export type NavbarFlyoutProps = {
  flyoutVisible: boolean
  closeFlyout: () => unknown
  companyClicked: () => unknown
  testnetClicked: () => unknown
  companyVisible: boolean
  testnetVisible: boolean
}

export function NavbarFlyout({
  flyoutVisible,
  closeFlyout,
  companyClicked,
  testnetClicked,
  companyVisible,
  testnetVisible,
}: NavbarFlyoutProps) {
  const navbarLinksProps = {
    companyClicked,
    testnetClicked,
    companyVisible,
    testnetVisible,
  }
  return (
    <div
      className={`absolute z-20 h-screen w-screen bg-white text-black font-extended transition-all transform-gpu ${
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
          condensed
          className="leading-relaxed text-4xl"
          {...navbarLinksProps}
        />
      </div>
    </div>
  )
}

export default NavbarFlyout
