import type { ReactNode } from 'react'
import Head from 'next/head'
import Img from 'next/image'
import clsx from 'clsx'

import leaderboardPic from 'public/leaderboard.png'

import { LoginContext } from 'hooks/useLogin'
import TubesCTA from 'components/FooterCTA'
import PageBanner from 'components/PageBanner'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import KeepReading from 'components/KeepReading'
import { BasicLink } from 'components/About/Link'
import { AboutHeader } from 'components/About/Header'
import { renderColumn } from 'components/About/CallToAction'
import { renderGuidelineColumn } from 'components/About/Guidelines'
import { NFTCard } from 'components/About/NFTCard'
import { PhaseComponent, Phase } from 'components/About/Phase'
import { cards, guidelines, callsToAction, phases } from 'components/About/data'
import { useResponsiveCards } from 'components/About/hooks'

import Loader from 'components/Loader'

import { ArrowLeft, ArrowRight } from 'components/icons/Arrows'

type ArrowButtonProps = {
  children: ReactNode
  onClick: () => unknown
}

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

const ArrowButton = ({ children, onClick }: ArrowButtonProps) => (
  <div
    className={clsx(
      'border',
      'border-black',
      'cursor-pointer',
      'flex',
      'h-12',
      'items-center',
      'justify-center',
      'm-2',
      'mt-16',
      'rounded-full',
      'w-12',
      'hover:bg-ifpink'
    )}
    onClick={onClick}
  >
    {children}
  </div>
)
type AboutProps = {
  showNotification: boolean
  loginContext: LoginContext
}

export default function About({ showNotification, loginContext }: AboutProps) {
  const { scrollLeft, scrollRight, $cards } = useResponsiveCards()
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
        className={clsx('bg-ifbeige', 'text-black')}
        loginContext={loginContext}
      />
      <main
        className={clsx(
          'bg-ifbeige',
          'flex-1',
          'items-center',
          'flex',
          'flex-col'
        )}
      >
        <PageBanner
          title="About the Incentivized Testnet"
          text="Sign up for the Iron Fish incentivized testnet to help make Iron Fish great 💖. Participate to earn testnet points (see Testnet Guidelines below for more details)."
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
        />
        <div className={clsx('mx-6', 'px-3', 'w-full', 'lg:w-2/3', 'mb-6')}>
          <AboutHeader className={clsx('md:w-1/2', 'md:ml-4', 'lg:ml-0')}>
            Phase 2
            <span className={clsx('ml-2', 'md:hidden')} />
            <br className={clsx('hidden', 'md:inline')} />
            <span className={clsx('hidden', 'md:inline')}>Participation</span>
            <br className={clsx('hidden', 'md:inline')} />
            Categories
          </AboutHeader>
          <div className={clsx('flex', 'flex-col', 'md:flex-row', 'mb-32')}>
            <div
              className={clsx(
                'flex',
                'flex-col',
                'w-full',
                'md:w-1/2',
                'md:mr-2',
                'md:ml-4',
                'lg:ml-0'
              )}
            >
              {callsToAction.columnOne.map(renderColumn)}
              <div
                className={clsx('text-center', 'hidden', 'md:flex', 'mx-auto')}
              >
                <BasicLink href="#guidelines">
                  View Testnet Guidelines
                </BasicLink>
              </div>
            </div>
            <div
              className={clsx(
                'flex',
                'flex-col',
                'w-full',
                'md:w-1/2',
                'md:ml-1',
                'md:-mt-32',
                'md:mr-4',
                'lg:mr-0'
              )}
            >
              {callsToAction.columnTwo.map(renderColumn)}
            </div>
            <div
              className={clsx('text-center', 'flex', 'md:hidden', 'mx-auto')}
            >
              <BasicLink href="#guidelines">View Testnet Guidelines</BasicLink>
            </div>
          </div>
        </div>
        <div className={clsx('mx-6', 'px-3', 'w-full', 'lg:w-2/3', 'mb-6')}>
          <AboutHeader className="md:w-1/2">Phase Overview</AboutHeader>
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
            {phases.map((p: Omit<Phase, 'index'>, index: number) => (
              <div
                className={clsx(
                  'flex',
                  'flex-col',
                  'w-full',
                  'md:w-1/2',
                  index === 0 ? 'md:ml-0' : 'md:ml-3',
                  'md:mr-3'
                )}
                key={index}
              >
                <PhaseComponent {...p} index={index + 1} />
              </div>
            ))}
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
        <div className={clsx('mx-6', 'px-3', 'w-full', 'lg:w-2/3', 'mb-6')}>
          <AboutHeader
            className={clsx(
              'text-left',
              'w-full',
              'mt-32',
              'mx-1.5',
              'md:mx-0',
              'md:text-center'
            )}
          >
            Win a Category, win an NFT!
          </AboutHeader>
          <div
            className={clsx(
              'w-full',
              'text-xl',
              'md:text-2xl',
              'md:w-2/3',
              'text-left',
              'm-auto',
              'mx-1.5',
              'mb-6',
              'md:text-center',
              'md:w-full'
            )}
          >
            <p className={clsx('md:max-w-[50rem]', 'm-auto')}>
              At the end of the testnet if you’re the leader in any of the
              categories mentioned above you might be eligible to receive an
              Iron Fish NFT. Filter the leaderboard to see category leaders.
            </p>
          </div>
        </div>
        <div
          className={clsx('flex', 'flex-row', 'w-full', 'overflow-x-auto')}
          ref={$cards}
        >
          {cards.map(nft => (
            <NFTCard key={nft.title} {...nft} />
          ))}
        </div>
        <div className={clsx('m-auto', 'flex')}>
          <ArrowButton onClick={scrollLeft}>
            <ArrowLeft />
          </ArrowButton>
          <ArrowButton onClick={scrollRight}>
            <ArrowRight />
          </ArrowButton>
        </div>
        <TubesCTA
          cta="Start earning points!"
          buttonText="Get Incentivized"
          goTo="/signup"
        />
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
