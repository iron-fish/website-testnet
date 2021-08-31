import { ReactNode } from 'react'
import Head from 'next/head'

import { RawButton } from 'components/Button'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { Box } from 'components/OffsetBorder/Box'

type CTAProps = {
  title: string
  children: ReactNode
  kind?: string
  earn?: number
  points?: string[]
  ctaText?: string
}

const callsToAction = [
  {
    title: `Mining the testnet`,
    content:
      'Actively mining our testnet earns you points for blocks that you mine.',
    points: ['1 block = 10 points', 'Mine 100 blocks a week'],
    ctaText: 'Install Iron Fish',
  },
  {
    title: 'Finding Bugs',
    content:
      'Do so by providing a detailed account of your bug on our discord channel.',
    points: ['1 bug = 100 points', 'Report up to 10 bugs a week'],
    ctaText: 'Document Bugs',
  },

  {
    title: 'Promoting the Testnet',
    content: 'Tweets, blogs, poems, you name it; you’ll earn points from them.',
    points: ['1 Promotion = 10 points', 'Make 100 promotions a week'],
    ctaText: 'Talk about us',
  },
  {
    title: 'Submit a Pull Request',
    content: 'Submit a PR to be reviewed by one of our teammates.',
    points: ['Points commensurate with quality of PR'],
    ctaText: 'Write some code',
  },
  {
    title: 'Being an Explorer',
    content:
      'The Explorer category is a way for our team to award participants who have made significant contributions to the testnet that don’t fall within a defined category. These are subjective considerations made by the Iron Fish team.',
    earn: 0,
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
  },

  {
    title: 'More Categories',
    content:
      'As our incentivized testnet grows we will inevitably add categories to it. If you have any great suggestions on what we could add, please reach out on Discord.',
    earn: 0,
    kind: 'coming soon',
  },
]

const EarnBox = ({
  children,
  title,
  points = [],
  kind = 'Earn Points By',
  earn = 1000,
  ctaText,
}: CTAProps) => (
  <div className="mb-3 w-full even:lg:-mt-44 odd:lg:mr-3 even:lg:-mr-8 odd:lg:-ml-4 lg:w-1/2">
    <Box behind="ifpink">
      <div className="m-4 pb-2" style={{ minHeight: '20rem' }}>
        <strong className="uppercase">{kind}</strong>
        <h3 className="text-left text-2xl md:text-3xl mt-3 mb-4 font-extended">
          {title}
        </h3>
        {children}
        {points && points.length > 0 && (
          <ul className="pl-3 ml-3">
            {points.map((p: string) => (
              <li className="list-disc my-3" key={p}>
                {p}
              </li>
            ))}
          </ul>
        )}
        {earn > 0 && (
          <div className="bg-ifpink px-4 py-2 inline-block mt-2 text-sm">
            Earn up to{' '}
            {earn.toLocaleString('en-US', { minimumFractionDigits: 0 })} points
            a week
          </div>
        )}
        {ctaText && (
          <RawButton
            border=""
            className="m-auto w-full mt-8 max-w-md mb-2 text-lg p-3"
            colorClassName="text-black bg-transparent hover:bg-black hover:text-white"
          >
            {ctaText}
          </RawButton>
        )}
      </div>
    </Box>
  </div>
)

export default function Leaderboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Leaderboard</title>
        <meta name="description" content="Leaderboard" />
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

          <h2 className="text-left text-4xl mt-24 mb-8 font-extended md:w-1/2 md:text-5xl ">
            Participation Categories
          </h2>
          <div className="flex column flex-wrap md:row">
            {callsToAction.map(({ title, content, ...ctaProps }) => (
              <EarnBox title={title} key={title} {...ctaProps}>
                {content}
              </EarnBox>
            ))}
          </div>
          <div className="mb-24"></div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
