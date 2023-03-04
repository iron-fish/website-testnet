import Link from 'next/link'
import clsx from 'clsx'

import TestnetGridElement from './TestnetGridElement'
import SectionHeader from './SectionHeader'

type TestnetProps = {
  condensed?: boolean
  showNotification?: boolean
  showRewardsDashboard?: boolean
}

function Testnet({
  condensed = false,
  showNotification,
  showRewardsDashboard,
}: TestnetProps) {
  const elementClassName = clsx('py-4', condensed ? 'px-2' : 'px-6')
  const textClassName = `ml-4`
  const className = condensed
    ? clsx('bg-white', 'z-40', 'w-full')
    : clsx(
        'absolute',
        'bg-white',
        'left-0',
        'right-0',
        'shadow-navbar',
        'z-40',
        showNotification ? 'top-[9.5rem]' : 'top-5.5'
      )
  return (
    <div className="flex">
      <div
        className={className}
        style={{ clipPath: !condensed ? 'inset(0 0 -100% 0)' : undefined }}
      >
        <div
          className={clsx(
            'flex',
            'justify-center',
            condensed ? 'flex-col' : 'border-b border-t flex-row'
          )}
        >
          <div
            className={clsx(
              'flex',
              condensed ? `justify-start p-4` : `justify-end border-r p-8 pb-10`
            )}
          >
            <div style={{ maxWidth: condensed ? undefined : '14rem' }}>
              <SectionHeader>IRON FISH CLI</SectionHeader>
              <div>
                <h4 className="text-xl mb-1">Installation Guide</h4>
                <p className="font-favorit text-ifgray text-sm mb-2">
                  An in-depth walkthrough of how to set up Iron Fish on your
                  machine.
                </p>
                <Link href="https://ironfish.network/docs/onboarding/iron-fish-tutorial">
                  <a className="flex font-favorit text-ifgray text-sm">
                    <span>Read the walkthrough</span>
                    <span className="ml-2">&#x203A;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className={`flex ${condensed ? 'p-4' : 'p-8 pl-14'} pb-12`}>
            <div className={condensed ? 'w-full' : ''}>
              <SectionHeader>INCENTIVIZED TESTNET</SectionHeader>
              <div
                className={
                  condensed
                    ? 'flex flex-col w-full'
                    : 'grid grid-rows-2 grid-cols-2 gap-4 -ml-6'
                }
              >
                <TestnetGridElement
                  href="/about"
                  header="About the Testnet"
                  body="How to earn points"
                  className={elementClassName}
                  textClassName={textClassName}
                  cubeClassName="text-iforange"
                />
                <TestnetGridElement
                  href="/leaderboard"
                  header="Testnet Leaderboard"
                  body="Earn your way to the top"
                  className={elementClassName}
                  textClassName={textClassName}
                  cubeClassName="text-ifcubepink"
                />
                <TestnetGridElement
                  href="/faq"
                  header="Testnet FAQ"
                  body="Frequently asked questions"
                  className={elementClassName}
                  textClassName={textClassName}
                  cubeClassName="text-iflightblue"
                />
                {showRewardsDashboard && (
                  <TestnetGridElement
                    href="/dashboard"
                    header="Testnet Dashboard"
                    body="Claim your rewards"
                    className={elementClassName}
                    textClassName={textClassName}
                    cubeClassName="text-iflightblue"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testnet
