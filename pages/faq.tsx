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
    question: `I participated in Phase 1 and 2. What’s different?`,
    id: `phase-1-changes`,
    answer: (
      <div>
        <li>
          We are now rewarding points{' '}
          <span className="underline">
            {' '}
            <Link href="/about"> for different actions</Link>
          </span>{' '}
          - you get points once a week for each multiasset action: minting,
          transferring, and burning .
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
    question: `How are you rewarding points?`,
    id: `how-do-i-get-points`,
    answer: (
      <div>
        You can see our point structure by viewing the{' '}
        <span className="underline">
          <Link href="/about">Phase 3 info page here</Link>
        </span>
        {'.'}
      </div>
    ),
  },
  {
    question: `Who is eligible for Incentivized Testnet tokens?`,
    id: `who-is-eligible-for-tokens`,
    answer: (
      <div>
        <div>
          To keep things fair and secure, the token eligibility process will be
          aiming to ensure each recipient has exactly one graffiti and is the
          person who participated in the Testnet process.
        </div>
        <div style={{ marginTop: '14px' }}>
          To accomplish this, we will enforce the following guidelines:
        </div>
        <li style={{ marginTop: '14px' }}>
          You must have a valid email on your Iron Fish account. We will be
          communicating verification steps through this email. See the next FAQ
          on how to change your email if it is not correct.
        </li>
        <li style={{ marginTop: '5px' }}>
          You must be able to log in to the Iron Fish account associated with
          your graffiti. You can confirm this by clicking &quot;Log In&quot; and
          seeing this change to your leaderboard graffiti upon clicking the
          login email.
        </li>
        <li style={{ marginTop: '5px' }}>
          You must provide government-issued identification, used as part of a
          KYC (Know Your Customer) process.
        </li>
        <li style={{ marginTop: '5px' }}>
          You must pass through our account de-duplication process.
        </li>
        <li style={{ marginTop: '5px' }}>
          Additionally, we will be following US regulations for token
          distribution.
        </li>
      </div>
    ),
  },
  {
    question: `I cannot login with my email. How do I change it?`,
    id: `how-do-I-change-email`,
    answer: (
      <div>
        You can do this by filling out our{' '}
        <span className="underline">
          <Link href="https://forms.gle/ALa79nhj9uiSQP389">
            email change form.
          </Link>
        </span>{' '}
        Please note that all email changes will be approved manually, and this
        may take some time. You can monitor our{' '}
        <span className="underline">
          <Link href="https://discord.com/channels/771503434028941353/816795744680935445">
            announcements on Discord
          </Link>
        </span>{' '}
        for updates on this process.
      </div>
    ),
  },
  {
    question: `What do points do?`,
    id: `what-do-points-do`,
    answer: `We have set aside a portion of the genesis block for $IRON exclusively for incentivized testnet users.
      Upon eligibility, your points for each Testnet Phase will be proportionally translated into tokens from this block upon the
      mainnet launch of $IRON.`,
  },
  {
    question: `How do I mint an asset?`,
    id: `how-to-mint`,
    answer: (
      <>
        You can mint an asset by running the command below. Make sure you use
        your graffiti as your asset name.
        <div>ironfish wallet:mint</div>
      </>
    ),
  },
  {
    question: `How do I burn an asset?`,
    id: `how-to-burn`,
    answer: (
      <div>
        You can burn an asset by running the command{' '}
        <div>ironfish wallet:burn</div>
      </div>
    ),
  },
  {
    question: `How do I send an asset?`,
    id: `how-to-send`,
    answer: (
      <>
        You can send an asset by running the command:
        <div>ironfish wallet:send</div>
        <div style={{ marginTop: '14px' }}>
          You must send your asset to the iron bank address{' '}
          <span style={{ wordWrap: 'break-word' }}>
            dfc2679369551e64e3950e06a88e68466e813c63b100283520045925adbe59ca
          </span>
        </div>
      </>
    ),
  },
  {
    question: `How do I get $IRON to pay for mint, burn, and send fees?`,
    id: `how-do-i-get-funds`,
    answer: (
      <>
        You can request $IRON using our faucet. Run the command:
        <div>ironfish faucet</div>
      </>
    ),
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
        <li style={{ marginTop: '5px' }}>
          Then, run <code>ironfish start</code> and leave that process running.
        </li>
        <li style={{ marginTop: '5px' }}>
          Finally, be sure to update your node within one week after the release
          of each new version. Follow the{' '}
          <span className="underline">
            <Link href="https://discord.com/channels/771503434028941353/816795744680935445">
              announcements
            </Link>
          </span>{' '}
          channel on our Discord server to hear about new releases.
        </li>
        <li style={{ marginTop: '5px' }}>
          That’s it - you will gain points every 12 hours.
        </li>
      </div>
    ),
  },
  {
    question: `What are the minimum hardware requirements for running a node? `,
    id: `minimum-hardware-requirements`,
    answer: (
      <div>
        Recommended minimum requirements from other members in the community
        are:
        <li style={{ marginTop: '5px' }}>CPU 4 core</li>
        <li style={{ marginTop: '5px' }}>RAM 8GB RAM</li>
      </div>
    ),
  },
  {
    question: `What happened to Phase 1 and 2 points?`,
    id: `phase-1-points`,
    answer: (
      <div>
        We have frozen the Phase 1 and 2 leaderboards, and it can be found at{' '}
        <span className="underline">
          <Link href="https://phase1.testnet.ironfish.network/leaderboard">
            phase 1
          </Link>
        </span>{' '}
        and{' '}
        <span className="underline">
          <Link href="https://phase2.testnet.ironfish.network/leaderboard">
            phase 2
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
    answer: `Yes - accounts with identical graffiti will carry over from Phase 1 and 2. If you already created an account with your graffiti for Phase 1 or 2, you do not have to register again for Phase 3.`,
  },
  {
    question: `Will there be weekly limits on earning points?`,
    id: 'weekly-limits',
    answer: `Yes, each graffiti will be able to earn points once a week for interacting with multiasset transactions.`,
  },
  {
    question: `How will Phase 3 be fair for new users starting?`,
    id: 'phase-2-fairness',
    answer: `We have allocated blocks of the initial pool of $IRON tokens separately for Phase 1, Phase 2, and Phase 3. So even if you were high on the leaderboard in Phase 1 or 2, you start at zero for the Phase 3 allocation. Everyone gets an equal shot at the new Phase 3 pool of tokens, so you’re not too late! `,
  },
  {
    question:
      'I get the error, "Your database needs to be upgraded (v10 vs v14)."',
    id: 'database-error',
    answer: `You are running phase 3 on an old phase 2 database. You need to delete your datadir located at ~/.ironfish`,
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
          end={new Date(1677369599000)}
          event=" until end of Phase 3!"
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
          disableButto={true}
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
