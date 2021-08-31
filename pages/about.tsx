import type { ReactNode } from 'react'
import { useEffect, useState, useCallback, useRef } from 'react'
import Head from 'next/head'
import Img from 'next/image'

import leaderboardPic from 'public/leaderboard.png'

import { RawButton } from 'components/Button'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'

import { BasicLink } from 'components/About/Link'
import { AboutHeader } from 'components/About/Header'
import { renderColumn } from 'components/About/CallToAction'
import { NFTCard } from 'components/About/NFTCard'
import { ArrowLeft, ArrowRight } from 'components/icons/Arrows'

type ArrowButtonProps = {
  children: ReactNode
  onClick: () => unknown
}

const ArrowButton = ({ children, onClick }: ArrowButtonProps) => (
  <div
    className="border rounded-full w-12 h-12 border-black flex items-center justify-center hover:bg-ifpink cursor-pointer m-2"
    onClick={onClick}
  >
    {children}
  </div>
)

const cards = [
  {
    title: 'Big Winner',
    content:
      'Earn this NFT by becoming the person with the most total points over the span of the testnet!',
    pic: '/reward-champion.png',
  },
  {
    title: 'Miner',
    content:
      'Earn this NFT by mining the most blocks over the entire span of our testnet',
    pic: '/reward-miner.png',
  },
  {
    title: 'Bug Catcher',
    content:
      'Earn this NFT by reporting the most bugs over the lifetime of our testnet',
    pic: '/reward-bug-catcher.png',
  },
  {
    title: 'Net Promoter',
    content:
      'Earn this NFT by promoting our testnet on social media - twitter, especially!',
    pic: '/reward-promoter.png',
  },
  {
    title: 'Explorer',
    content:
      'Earn this NFT by being active on all fronts in the testnet. Your participation would be noted!',
    pic: '/reward-explorer.png',
  },
  {
    title: 'Community Contributor',
    content: 'Earn this NFT by making our testnet more accessible.',
    pic: '/reward-contributor.png',
  },
  {
    title: 'Builder',
    content:
      'Earn this NFT by merging the most valuable PR’s. We are looking for quality over quantity.',
    pic: '/reward-pull-requester.png',
  },
  {
    title: 'Trader',
    content:
      'Earn this NFT by being active with transactions. Sending 3 a day is an easy way to win!',
    pic: '/reward-transactor.png',
  },
]

const callsToAction = {
  columnOne: [
    {
      title: 'Finding Bugs',
      content:
        'Do so by providing a detailed account of your bug on our discord channel.',
      points: ['1 bug = 100 points', 'Report up to 10 bugs a week'],
      ctaText: 'Document Bugs',
      href: 'https://github.com/iron-fish/ironfish/issues',
    },
    {
      title: 'Contributing to the Community',
      content:
        'Contributing to the community means helping us make our testnet more accessible to a wider audience. For example, translating our getting started doc to another language is a great way to make Iron Fish more accessible.',
      points: [
        'Points commensurate with quality of contribution.',
        'Email us before submitting your contribution so we can help you',
      ],
      ctaText: 'Contribute Today',
      href: 'https://github.com/iron-fish/website/tree/master/docs/onboarding',
    },
    {
      title: 'Being an Explorer',
      content:
        'The Explorer category is a way for our team to award participants who have made significant contributions to the testnet that don’t fall within a defined category. These are subjective considerations made by the Iron Fish team.',
      earn: 0,
    },
  ],
  columnTwo: [
    {
      title: `Mining the testnet`,
      content:
        'Actively mining our testnet earns you points for blocks that you mine.',
      points: ['1 block = 10 points', 'Mine 100 blocks a week'],
      ctaText: 'Install Iron Fish',
      href: 'https://ironfish.network/docs/onboarding/miner-iron-fish',
    },
    {
      title: 'Promoting the Testnet',
      content:
        'Tweets, blogs, poems, you name it; you’ll earn points from them.',
      points: ['1 Promotion = 10 points', 'Make 100 promotions a week'],
      ctaText: 'Talk about us',
      href: 'https://twitter.com/ironfishcrypto',
    },
    {
      title: 'Submit a Pull Request',
      content: 'Submit a PR to be reviewed by one of our teammates.',
      points: ['Points commensurate with quality of PR'],
      ctaText: 'Write some code',
      href: 'https://github.com/iron-fish/ironfish/pulls',
    },

    {
      title: 'More Categories',
      content:
        'As our incentivized testnet grows we will inevitably add categories to it. If you have any great suggestions on what we could add, please reach out on Discord.',
      earn: 0,
      kind: 'coming soon',
    },
  ],
}
export default function About() {
  const [$cardScroll, $setCardScroll] = useState<number>(0)
  const [$scrollWidth, $setScrollWidth] = useState<number>(0)
  const $cards = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const reportWindowSize = () => {
      $setScrollWidth(window.innerWidth)
      $setCardScroll(0)
      if ($cards && $cards.current) {
        $cards.current.scrollTo({ left: 0, behavior: 'smooth' })
      }
    }
    reportWindowSize()
    window.addEventListener('resize', reportWindowSize)
    return () => window.removeEventListener('resize', reportWindowSize)
  }, [$setScrollWidth, $setCardScroll, $cards])
  const scrollLeft = useCallback(() => {
    const left = $cardScroll - Math.round($scrollWidth * 0.75)
    if ($cards && $cards.current && $cards.current.scrollWidth) {
      const start = left >= 0 ? left : 0
      $setCardScroll(start)
      $cards.current.scrollTo({ left: start, behavior: 'smooth' })
    }
  }, [$setCardScroll, $cardScroll, $cards, $scrollWidth])
  const scrollRight = useCallback(() => {
    const right = $cardScroll + Math.round($scrollWidth * 0.75)
    if ($cards && $cards.current && $cards.current.scrollWidth) {
      const scrollWidth = $cards.current.scrollWidth || 0
      if (scrollWidth && right) {
        const end = right <= scrollWidth ? right : scrollWidth
        $setCardScroll(end)
        $cards.current.scrollTo({ left: end, behavior: 'smooth' })
      }
    }
  }, [$setCardScroll, $cardScroll, $cards, $scrollWidth])
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>About</title>
        <meta name="description" content="About" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-iforange text-black" />

      <main className="bg-iforange flex-1 items-center flex flex-col">
        <div className="w-4/5 md:w-2/3">
          <h1 className="text-left md:text-center text-5xl md:text-6xl mt-24 mb-8 font-extended">
            About the Incentivized Testnet
          </h1>
          <p className="text-justify text-lg md:text-center md:text-2xl mb-8 font-favorit">
            Sign up for our incentivized testnet to participate in various
            activities that will earn you points which you can reedem for $IRON
            - our privacy coin. The sooner you are to signup, the longer you’ll
            have to earn points!
          </p>
          <RawButton className="m-auto w-full mt-8 max-w-md mb-2 text-lg md:text-xl p-3 md:py-5 md:px-4">
            Get Incentivized
          </RawButton>
          <AboutHeader className="md:w-1/2">
            Participation Categories
          </AboutHeader>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-1/2 md:mr-2">
              {callsToAction.columnOne.map(renderColumn)}
              <div className="text-center hidden md:flex mx-auto">
                <BasicLink href="#">View Testnet Guidelines</BasicLink>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 md:ml-1 md:-mt-32">
              {callsToAction.columnTwo.map(renderColumn)}
            </div>
            <div className="text-center flex md:hidden mx-auto">
              <BasicLink href="#">View Testnet Guidelines</BasicLink>
            </div>
          </div>
          <AboutHeader className="md:w-1/2">The Leaderboard</AboutHeader>
          <p className="w-full md:w-2/3">
            Not only does earning points help you climb the About, but the more
            points you have means the more $IRON you redeem at the end of the
            testnet. Placing in the top 10 also earns you bonus points!
          </p>
          <div className="mt-2 mb-4 block">
            <BasicLink href="/leaderboard">Show me the leaderboard</BasicLink>
          </div>
          <div className="flex md:ml-24">
            <Img src={leaderboardPic} />
          </div>
          <AboutHeader className="text-center w-full">
            Win a Category, win an NFT!
          </AboutHeader>
          <p className="text-center max-w-lg m-auto text-justify mb-14">
            At the end of the testnet if you’re the leader in any of the
            categories mentioned above, you’ll not only earn extra points as a
            prize, but also an Iron Fish NFT. Filter the leaderboard to see
            category leaders.
          </p>
        </div>
        <div className="flex flex-row w-full overflow-x-hidden" ref={$cards}>
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
        <div className="mb-24"></div>
      </main>
      <Footer />
    </div>
  )
}
