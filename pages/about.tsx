import type { ReactNode } from 'react'
import Head from 'next/head'
import Img from 'next/image'
import clsx from 'clsx'

import leaderboardPic from 'public/leaderboard.png'

import { LoginContext } from 'hooks/useLogin'
import PageBanner from 'components/PageBanner'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import KeepReading from 'components/KeepReading'
import { BasicLink } from 'components/About/Link'
import { AboutHeader } from 'components/About/Header'
import { renderGuidelineColumn } from 'components/About/Guidelines'
import { Phase, PhaseProps } from 'components/About/Phase'
import { guidelines, Phase1, Phase2, Phase3 } from 'components/About/data'

import Loader from 'components/Loader'

const Para = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <p
    className={clsx('w-full', 'text-xl', 'md:text-2xl', 'md:w-2/3', className)}
  >
    {children}
  </p>
)

type AboutProps = {
  showNotification: boolean
  loginContext: LoginContext
}

export default function About({ showNotification, loginContext }: AboutProps) {
  const { checkLoggedIn, checkLoading } = loginContext
  const loaded = checkLoggedIn()
  return checkLoading() ? (
    <Loader />
  ) : (
    <div className={clsx('min-h-screen', 'flex', 'flex-col', 'font-favorit')}>
      <Head>
        <title>About</title>
        <meta name="description" content="About" />
      </Head>
      <Navbar
        showNotification={showNotification}
        fill="black"
        className={clsx('bg-ifbackgroundgray', 'text-black')}
        loginContext={loginContext}
      />
      <main
        className={clsx(
          'bg-ifbackgroundgray',
          'flex-1',
          'items-center',
          'flex',
          'flex-col'
        )}
      >
        <PageBanner
          title={<>Incentivized Testnet</>}
          text={`Welcome to the incentivized testnet!`}
          buttonText={!loaded ? 'Sign Up' : ''}
          buttonClassName={clsx(
            'm-auto',
            'mb-32',
            'w-full',
            'max-w-[240px]',
            'text-lg',
            'p-3',
            'md:text-xl',
            'md:py-5',
            'md:px-4'
          )}
          buttonLink={!loaded ? '/signup' : ''}
          disableButton={true}
        />
        <div className={clsx('mx-6', 'px-3', 'w-full', 'lg:w-2/3', 'mb-6')}>
          <AboutHeader className="md:w-1/2">Phase Overview</AboutHeader>
          <div
            className={clsx(
              'flex',
              'flex-col',
              'mr-2',
              'md:mr-0',
              'md:flex-row'
            )}
          >
            {[Phase1, Phase2].map((p: Omit<PhaseProps, 'index'>) => (
              <div
                className={clsx(
                  'flex',
                  'flex-col',
                  'w-full',
                  'md:w-1/2',
                  'md:ml-3',
                  'md:mr-3'
                )}
                key={p.phaseNum}
              >
                <Phase {...p} index={p.phaseNum} />
              </div>
            ))}
          </div>
          <div
            className={clsx(
              'flex',
              'flex-col',
              'mr-2',
              'md:mr-0',
              'md:flex-row',
              'mb-12'
            )}
          >
            <div
              className={clsx(
                'flex',
                'flex-col',
                'w-full',
                'md:w-1/2',
                'md:ml-3',
                'md:mr-8'
              )}
              key={3}
            >
              <Phase {...Phase3} index={Phase3.phaseNum} />
            </div>

            {/* had to add a hidden div here to make the double column line up, without
            this box things wouldn't align since there is a misconfigured overlap in the bounding boxes */}
            <div
              className={clsx(
                'flex',
                'flex-col',
                'w-full',
                'md:w-1/2',
                'md:ml-0',
                'md:mr-0'
              )}
              key={3}
            ></div>
          </div>
        </div>
        <div className={clsx('mx-6', 'px-3', 'w-full', 'lg:w-2/3', 'mb-6')}>
          <AboutHeader className={clsx('md:w-1/2', 'mt-32')}>
            The Leaderboard
          </AboutHeader>
          <Para>
            Earning points places you on the Leaderboard. See how you progress
            each week in comparison to others.
          </Para>
          <div className={clsx('mt-8', 'mb-4', 'block', 'text-2xl')}>
            <BasicLink href="/leaderboard">Show me the leaderboard</BasicLink>
          </div>
          <div className={clsx('flex', 'md:ml-24')}>
            <Img src={leaderboardPic} />
          </div>
        </div>
        <div id="guidelines" className={clsx('mt-32', 'mx-3', 'lg:w-2/3')}>
          <AboutHeader className={clsx('text-left', 'text-4xl', 'w-1/2')}>
            Testnet Guidelines
          </AboutHeader>
          <div className={clsx('flex', 'flex-col', 'md:flex-row', 'mt-6')}>
            <div
              className={clsx(
                'flex',
                'flex-col',
                'w-full',
                'md:w-1/2',
                'md:mr-2'
              )}
            >
              {guidelines.columnOne.map(renderGuidelineColumn)}
            </div>
            <div
              className={clsx(
                'flex',
                'flex-col',
                'w-full',
                'md:w-1/2',
                'md:ml-1',
                'md:-mt-24'
              )}
            >
              {guidelines.columnTwo.map(renderGuidelineColumn)}
            </div>
          </div>
        </div>
        <KeepReading />
        <div className="mb-24"></div>
      </main>
      <Footer />
    </div>
  )
}
