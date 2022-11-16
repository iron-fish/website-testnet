import { useEffect } from 'react'
import type { ReactNode } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'

import TubesCTA from 'components/FooterCTA'
import PageBanner from 'components/PageBanner'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import KeepReading from 'components/KeepReading'
import QuestionAnswer from 'components/FAQ/QuestionAnswer'
import Loader from 'components/Loader'
import { scrollTo } from 'utils/scroll'
import { LoginContext } from 'hooks/useLogin'
import CountdownTimer from 'components/leaderboard/CountdownTimer'

const questions: ReadonlyArray<{
  question: string
  answer: ReactNode
  id: string
}> = [
  {
    question: `How long will the Phase 2 incentivized testnet run for?`,
    id: `testnet-duration`,
    answer: `Phase 2 ran from May 10, 2022 @ 12:00 PDT until November 22, 2022 @ 12:00 PDT. The testnet will run until the Iron Fish node is stable, feature-complete, and ready for mainnet 🎉`,
  },
  {
    question: `I participated in Phase 1. What’s different?`,
    id: `phase-1-changes`,
    answer: (
      <div>
        <li>
          We are now rewarding points{' '}
          <span className="underline">
            {' '}
            <Link href="/about"> for different actions</Link>
          </span>{' '}
          - you get points for hosting a node and making transactions, and you
          no longer get points directly for mining tokens. The other categories
          for points remain the same.
        </li>
        <li>
          Additionally, we have added a number of commands to the CLI to make
          participating in the testnet simpler - these will help you set up your
          graffiti and telemetry. Run <code>ironfish testnet</code> to set up
          your node to be ready for testnet. Check out our{' '}
          <span className="underline">
            <Link href="https://ironfish.network/docs/onboarding/iron-fish-tutorial">
              getting started
            </Link>
          </span>{' '}
          for more details!
        </li>
      </div>
    ),
  },
  {
    question: `Why the point changes?`,
    id: `why-changes`,
    answer: (
      <div>
        <li>
          De-incentivizing direct mining gives you the opportunity to join a
          mining pool and earn proportional shares of blocks mined by a group of
          miners. No more need for a crazy mining rig - just join up with a
          number of other miners and get a proportional share of the new tokens
          mined!
        </li>
        <li>
          And if you do have that amazing mining rig, don’t worry - you will
          still be able to earn lots of points by making large transactions with
          the Iron Bank.
        </li>
      </div>
    ),
  },
  {
    question: `How are you rewarding points?`,
    id: `how-do-i-get-points`,
    answer: (
      <div>
        You can see our point structure by viewing the{' '}
        <span className="underline">
          <Link href="/about">Phase 2 info page here</Link>
        </span>
        {'.'}
      </div>
    ),
  },
  {
    question: `What do points do?`,
    id: `what-do-points-do`,
    answer: `We have set aside a portion of the genesis block for $IRON exclusively for incentivized testnet users.
      Upon eligibility, your Phase 1 and Phase 2 points will be proportionally translated into tokens from this block upon the
      mainnet launch of $IRON.`,
  },
  {
    question: `How do I host a node in a way that earns me points?`,
    id: `node-points`,
    answer: (
      <div>
        <li>
          First, run <code>ironfish testnet</code> to configure your node with
          proper graffiti and telemetry settings.
        </li>
        <li>
          Then, run <code>ironfish start</code> and leave that process running.
        </li>
        <li>That’s it - you will gain points every 12 hours.</li>
      </div>
    ),
  },
  {
    question: `How do I send a transaction to earn points?`,
    id: `transaction-points`,
    answer: (
      <div>
        <li>
          First, mine some $IRON. You can do this by running either your own
          miner or joining a mining pool. You can view the{' '}
          <span className="underline">
            <Link href="https://ironfish.network/docs/onboarding/miner-iron-fish#set-block-graffiti-optional">
              options here
            </Link>
          </span>
          .
        </li>
        <li>
          Then, you may send the $IRON to our Iron Bank transaction processing
          node by running <code>ironfish deposit</code>.
        </li>
        <li>You receive points for every transaction of 0.1 $IRON.</li>
      </div>
    ),
  },
  {
    question: `Will there be a KYC process for participants in order to claim coins?`,
    id: 'kyc-process',
    answer: `Coins will be distributed to eligible participants. It's very likely a KYC process will be part of determining eligibility.`,
  },
  {
    question: `What are the minimum hardware requirements for running a node? `,
    id: `minimum-hardware-requirements`,
    answer: (
      <div>
        Recommended minimum requirements from other members in the community
        are:
        <li>CPU 4 core</li>
        <li>RAM 8GB RAM</li>
      </div>
    ),
  },
  {
    question: `What happened to Phase 1 points?`,
    id: `phase-1-points`,
    answer: (
      <div>
        We have frozen the Phase 1 leaderboard, and it can be{' '}
        <span className="underline">
          <Link href="https://phase1.testnet.ironfish.network/leaderboard">
            found here
          </Link>
        </span>
        .
      </div>
    ),
  },
  {
    question: `What is graffiti? How do I set it up?`,
    id: `graffiti-set-up`,
    answer: (
      <div>
        Graffiti is your personal identifier. You need to set it up to get
        credited for your participation in the testnet. We suggest using our new
        testnet CLI commands to ensure everything is properly set{' '}
        <code>ironfish testnet</code>. See the{' '}
        <span className="underline">
          <Link href="https://ironfish.network/docs/onboarding/iron-fish-tutorial">
            getting started
          </Link>
        </span>{' '}
        for more details.
      </div>
    ),
  },
  {
    question: `Can I claim points for blocks under a different graffiti than the one I registered with? `,
    id: `different-graffiti`,
    answer: (
      <div>
        Points can only be earned for blocks with the same graffiti as your
        testnet account. You must{' '}
        <span className="underline">
          <Link href="/signup">register</Link>
        </span>{' '}
        with your graffiti before you can start earning points.
      </div>
    ),
  },
  {
    question: `Will my accounts transfer?`,
    id: 'account-transfer',
    answer: `Yes - accounts with identical graffiti will carry over from Phase 1. If you already created an account with your graffiti for Phase 1, you do not have to register again for Phase 2.`,
  },
  {
    question: `Will there be weekly limits on earning points?`,
    id: 'weekly-limits',
    answer: `No - we have removed weekly point limits in Phase 2.`,
  },
  {
    question: `How will Phase 2 be fair for new users starting?`,
    id: 'phase-2-fairness',
    answer: `We have allocated blocks of the initial pool of $IRON tokens separately for Phase 1 and Phase 2. So even if you were high on the leaderboard in Phase 1, you start at zero for the Phase 2 allocation. Everyone gets an equal shot at the new Phase 2 pool of tokens, so you’re not too late! `,
  },
  {
    question: `If all the miners connect to pool node only how does that help with the Phase 2 objective of telemetry/running node? Are the blocks always signed by the pool?`,
    id: 'miners-pool',
    answer: `Hosting a node with enabled telemetry earns you points directly, regardless of your participation in a mining pool. The mining of blocks is no longer worth points, so mining via pool has no bearing on your leaderboard spot. This is part of the reason we moved away from directly incentivizing mining tokens.`,
  },
]

const PageBannerBody = () => (
  <span>
    {`Some of our most frequently asked questions regarding the
testnet. If you're looking for more detailed answers, or you
don't see the question that you'd like to ask, please reach out
on our `}
    <span className="underline">
      <Link href="https://discord.gg/ironfish">Discord server</Link>
    </span>
    .
  </span>
)
type FaqProps = {
  showNotification: boolean
  loginContext: LoginContext
}

export default function Faq({ showNotification, loginContext }: FaqProps) {
  const { checkLoggedIn, checkLoading } = loginContext
  const isLoaded = checkLoggedIn()
  const isLoading = checkLoading()
  const $router = useRouter()
  const { asPath: rawPath } = $router
  useEffect(() => {
    if (isLoaded || !isLoading) {
      const hash = rawPath.slice(rawPath.indexOf('#') + 1)
      const el = document.getElementById(hash)
      if (el) {
        scrollTo(el)
      }
    }
  }, [rawPath, isLoaded, isLoading])
  return isLoading ? (
    <Loader />
  ) : (
    <div className={clsx('min-h-screen', 'flex', 'flex-col', 'font-favorit')}>
      <Head>
        <title>FAQ</title>
        <meta name="description" content="FAQ" />
      </Head>

      <Navbar
        showNotification={showNotification}
        fill="black"
        className={clsx('bg-white', 'text-black')}
        loginContext={loginContext}
      />

      <main
        className={clsx(
          'bg-white',
          'flex-1',
          'items-center',
          'flex',
          'flex-col'
        )}
      >
        <CountdownTimer
          end={new Date(1703782800000)}
          event=" until deposits are closed."
        />
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
        <div className={clsx('w-4/5', 'md:w-2/3')}>
          <h1
            className={clsx(
              'text-left',
              'text-3xl',
              'ml-0',
              'mt-24',
              'mb-8',
              'font-extended',
              'md:text-4xl'
            )}
          >
            Questions
          </h1>
          <div className={clsx('flex', 'flex-col', 'gap-y-8')}>
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
}
