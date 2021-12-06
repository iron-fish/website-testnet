import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import TubesCTA from 'components/FooterCTA'
import PageBanner from 'components/PageBanner'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import KeepReading from 'components/KeepReading'
import QuestionAnswer from 'components/FAQ/QuestionAnswer'
import { LoginContext } from 'contexts/LoginContext'
import Loader from 'components/Loader'
import React from 'react'

import type { ReactNode } from 'react'

const questions: ReadonlyArray<{ question: string; answer: ReactNode }> = [
  {
    question: `How long will the incentivized testnet run for?`,
    answer: `The testnet will run until the Iron Fish node is stable, feature-complete, and ready for mainnet 🎉`,
  },
  {
    question: `Can I participate in the Incentivized Testnet if I’m in the US?`,
    answer: (
      <div>
        Yes. Please see{' '}
        <span className="underline">
          <Link href="/about#guidelines">Testnet Guidelines</Link>
        </span>{' '}
        for more details.
      </div>
    ),
  },
  {
    question: `How do I get points for mining blocks? `,
    answer: (
      <div>
        First, you must{' '}
        <span className="underline">
          {' '}
          <Link href="/signup"> register</Link>
        </span>{' '}
        and confirm your account via email for the incentivized testnet. You
        must set your graffiti to be what you registered with when mining
        blocks. To set your graffiti, see the{' '}
        <span className="underline">
          <Link href="https://ironfish.network/docs/onboarding/miner-iron-fish#set-block-graffiti-optional">
            docs section on mining
          </Link>
        </span>
        .
      </div>
    ),
  },
  {
    question: `Is there a GPU miner?`,
    answer: `There is currently no official GPU miner, but there’s nothing stopping you from working on it!`,
  },
  {
    question: `Can points be retroactively applied for blocks mined before I registered and confirmed my account?`,
    answer: `Points cannot be retroactively applied for blocks mined prior to the start of the incentivized testnet or prior to your account registration and confirmation.`,
  },
  {
    question: `Can I claim points for blocks under a different graffiti than the one I registered with?`,
    answer: `Points can only be earned for blocks with the same graffiti as your testnet account.`,
  },
  {
    question: `What are the minimum hardware requirements for running a node? `,
    answer: (
      <div>
        Recommended minimum requirements from other members in the community
        are:
        <li>CPU 4 core</li>
        <li>RAM 8GB RAM</li>
      </div>
    ),
  },
]

const PageBannerBody = () => (
  <span>
    {`Some of our most frequently asked questions regarding the
testnet. If you're looking for more detailed answers, or you
don't see the question that you'd like to ask, please reach out
on our `}
    <span className="underline">
      <Link href="https://discord.com/invite/EkQkEcm8DH">Discord server</Link>
    </span>
    .
  </span>
)

export default function Faq() {
  return (
    <LoginContext.Consumer>
      {({ checkLoading, checkLoggedIn }) => {
        const isLoaded = checkLoggedIn()
        return checkLoading() ? (
          <Loader />
        ) : (
          <div className="min-h-screen flex flex-col font-favorit">
            <Head>
              <title>FAQ</title>
              <meta name="description" content="FAQ" />
            </Head>

            <Navbar fill="black" className="bg-white text-black" />

            <main className="bg-white flex-1 items-center flex flex-col">
              <div className="w-4/5 md:w-2/3">
                <PageBanner
                  title="Testnet FAQ"
                  text={<PageBannerBody />}
                  buttonText={!isLoaded ? 'Sign Up' : ''}
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
                  buttonLink={!isLoaded ? '/signup' : ''}
                />
                <h1
                  className={clsx(
                    'text-left',
                    'text-5xl',
                    'ml-0',
                    'mt-24',
                    'mb-8',
                    'font-extended',
                    'md:text-6xl'
                  )}
                >
                  Questions
                </h1>
                <div className="flex flex-col gap-y-8">
                  {questions.map((qa, i) => (
                    <QuestionAnswer key={i} index={i} {...qa} />
                  ))}
                </div>
              </div>
              <TubesCTA
                cta="Join the Testnet!"
                buttonText="Join Now"
                goTo="/signup"
              />
              <KeepReading background="bg-white" />
              <div className="mb-24"></div>
            </main>
            <Footer />
          </div>
        )
      }}
    </LoginContext.Consumer>
  )
}
