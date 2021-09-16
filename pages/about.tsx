import type { ReactNode } from 'react'
import Head from 'next/head'
import Img from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import leaderboardPic from 'public/leaderboard.png'
import interTubesPic from 'public/intertubes.png'

import { RawButton } from 'components/Button'
import PageBanner from 'components/PageBanner'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'

import { BasicLink } from 'components/About/Link'
import { AboutHeader } from 'components/About/Header'
import { renderColumn } from 'components/About/CallToAction'
import { renderGuidelineColumn } from 'components/About/Guidelines'
import { NFTCard } from 'components/About/NFTCard'
import {
  cards,
  guidelines,
  callsToAction,
  readingLinks,
} from 'components/About/data'
import { useResponsiveCards } from 'components/About/hooks'

import {
  TaillessArrowRight,
  ArrowLeft,
  ArrowRight,
} from 'components/icons/Arrows'

type ArrowButtonProps = {
  children: ReactNode
  onClick: () => unknown
}

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-iflightorange text-black" />

      <main className="bg-iflightorange flex-1 items-center flex flex-col">
        <div className="w-4/5 md:w-2/3">
          <PageBanner
            title="About the Incentivized Testnet"
            text="Sign up for the Iron Fish incentivized testnet to help make Iron Fish great 💖. Participate to earn testnet points, which will be redeemable for $IRON at a later time (see Testnet Guidelines for more details)."
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
          <AboutHeader className="md:w-1/2">
            Participation Categories
          </AboutHeader>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-1/2 md:mr-2">
              {callsToAction.columnOne.map(renderColumn)}
              <div className="text-center hidden md:flex mx-auto">
                <BasicLink href="#guidelines">
                  View Testnet Guidelines
                </BasicLink>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 md:ml-1 md:-mt-32">
              {callsToAction.columnTwo.map(renderColumn)}
            </div>
            <div className="text-center flex md:hidden mx-auto">
              <BasicLink href="#guidelines">View Testnet Guidelines</BasicLink>
            </div>
          </div>
          <AboutHeader className="md:w-1/2 mt-48">The Leaderboard</AboutHeader>
          <p className="w-full md:w-2/3 text-2xl">
            Not only does earning points help you climb the Leaderboard, but the
            more points you have means the more $IRON you redeem at the end of
            the testnet. Placing in the top 10 also earns you bonus points!
          </p>
          <div className="mt-8 mb-4 block">
            <BasicLink href="/leaderboard">Show me the leaderboard</BasicLink>
          </div>
          <div className="flex md:ml-24">
            <Img src={leaderboardPic} />
          </div>
          <AboutHeader className="text-center w-full mt-48">
            Win a Category, win an NFT!
          </AboutHeader>
          <p className="text-center max-w-lg m-auto text-justify mb-14">
            At the end of the testnet if you’re the leader in any of the
            categories mentioned above, you’ll not only earn extra points as a
            prize, but also an Iron Fish NFT. Filter the leaderboard to see
            category leaders.
          </p>
        </div>
        <div className="flex flex-row w-full overflow-x-auto" ref={$cards}>
          {cards.map(nft => (
            <NFTCard key={nft.title} {...nft} />
          ))}
        </div>
        <div className="m-auto flex mt-4">
          <ArrowButton onClick={scrollLeft}>
            <ArrowLeft />
          </ArrowButton>
          <ArrowButton onClick={scrollRight}>
            <ArrowRight />
          </ArrowButton>
        </div>
        <div className="w-full flex mt-10 border-black border-b">
          <div className="w-4/5 md:w-2/5 m-auto max-w-4xl">
            <Img src={interTubesPic} layout="responsive" />
          </div>
        </div>
        <div className="w-full flex mt-10 border-black border-b flex-col">
          <h3 className="font-extended text-3xl md:text-4xl m-auto text-center">
            What are you waiting for?
            <br />
            Start earning points!
          </h3>
          <RawButton
            className={clsx(
              'm-auto',
              'mt-8',
              'mb-12',
              'max-w-[240px]',
              'text-lg',
              'px-4',
              'py-3',
              'md:text-xl',
              'md:py-5',
              'md:px-4'
            )}
          >
            Get Incentivized
          </RawButton>
        </div>
        <div id="guidelines" className="mt-12 mx-3 sm:w-3/4 md:w-2/3">
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

        <div className="mt-12 mx-3 w-full md:w-2/3">
          <AboutHeader className="text-left text-4xl mx-4">
            Keep Reading
          </AboutHeader>
          <ul className="px-4">
            {readingLinks.map(({ text, href }) => (
              <li
                className="list-style-none w-full m-auto flex justify-between relative h-8 my-6"
                key={text}
              >
                <div className="text-2xl font-extended absolute left-0 bg-iflightorange h-8 z-10 pr-4">
                  <Link href={href}>{text}</Link>
                </div>
                <div className="w-full relative flex justify-between">
                  <div
                    className="border-black h-1/2 border-b-2 -mr-4"
                    style={{ width: 'calc(100% - 2px)' }}
                  />
                  <TaillessArrowRight
                    style={{ marginTop: '3.5px' }}
                    className="absolute right-0"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-24"></div>
      </main>
      <Footer />
    </div>
  )
}
