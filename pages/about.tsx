import type { ReactNode } from 'react'
import Head from 'next/head'
import Img from 'next/image'
import clsx from 'clsx'

import leaderboardPic from 'public/leaderboard.png'

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
import { cards, guidelines, callsToAction } from 'components/About/data'
import { useResponsiveCards } from 'components/About/hooks'

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

export default function About() {
  const { scrollLeft, scrollRight, $cards } = useResponsiveCards()
  return (
    <div className="min-h-screen flex flex-col font-favorit">
      <Head>
        <title>About</title>
        <meta name="description" content="About" />
      </Head>

      <Navbar fill="black" className="bg-iflightorange text-black" />

      <main className="bg-iflightorange flex-1 items-center flex flex-col">
        <PageBanner
          title="About the Incentivized Testnet"
          text="Sign up for the Iron Fish incentivized testnet to help make Iron Fish great 💖. Participate to earn testnet points (see Testnet Guidelines below for more details)."
          buttonText="Sign Up"
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
          buttonLink="/signup"
        />
        <div className={clsx('mx-3', 'px-3', 'w-full', 'lg:w-2/3', 'mb-6')}>
          <AboutHeader className="md:w-1/2">
            Participation Categories
          </AboutHeader>
          <div className="flex flex-col md:flex-row mb-16">
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
              <div className="text-center hidden md:flex mx-auto">
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
            <div className="text-center flex md:hidden mx-auto">
              <BasicLink href="#guidelines">View Testnet Guidelines</BasicLink>
            </div>
          </div>
          <div className="hidden md:block">
            <AboutHeader className="md:w-1/2 mt-24">
              The Leaderboard
            </AboutHeader>
            <Para>
              Earning points places you on the Leaderboard. See how you progress
              each week in comparison to others.
            </Para>
            <div className="mt-8 mb-4 block text-2xl">
              <BasicLink href="/leaderboard">Show me the leaderboard</BasicLink>
            </div>
            <div className="flex md:ml-24">
              <Img src={leaderboardPic} />
            </div>
          </div>
          <AboutHeader className="text-center w-full mt-32">
            Win a Category, win an NFT!
          </AboutHeader>
          <Para className="text-center m-auto">
            At the end of the testnet if you’re the leader in any of the
            categories mentioned above you might be eligible to receive an Iron
            Fish NFT. Filter the leaderboard to see category leaders.
          </Para>
        </div>
        <div className="flex flex-row w-full overflow-x-auto" ref={$cards}>
          {cards.map(nft => (
            <NFTCard key={nft.title} {...nft} />
          ))}
        </div>
        <div className="m-auto flex">
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
        <div id="guidelines" className="mt-24 mx-3 lg:w-2/3">
          <AboutHeader className="text-left text-4xl w-1/2">
            Testnet Guidelines
          </AboutHeader>
          <div className="flex flex-col md:flex-row mt-6">
            <div className="flex flex-col w-full md:w-1/2 md:mr-2">
              {guidelines.columnOne.map(renderGuidelineColumn)}
            </div>
            <div className="flex flex-col w-full md:w-1/2 md:ml-1 md:-mt-32">
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
