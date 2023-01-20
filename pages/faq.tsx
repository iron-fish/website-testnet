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
            We are now rewarding points for various {' '}
            <span className="underline">{' '}
              <Link href="/about"> Categories. </Link>
            </span>{' '}
          </li>
          <li>You get points once a week for each multiasset action:</li>
          <li><b>Mint</b> Asset | <b>Burn</b> Asset | <b>Send</b> Asset</li>
          <li>
            We have added a number of commands to the CLI, to make participating 
            in testnet simpler.
          </li>
          <li>These will help you set up your <i>graffiti</i> and <i>telemetry</i>.</li>
          <li>Run <code><b>ironfish testnet</b></code> to set up your node to be ready for testnet.</li>
          <li>
            Check out our{' '}
            <span className="underline">
              <Link href="https://ironfish.network/docs/onboarding/iron-fish-tutorial"> Get Started </Link>
            </span>{' '}
            tutorial for more details!
        </li>
      </div>
    ),
  },
  {
    question: `How are you rewarding points?`,
    id: `how-do-i-get-points`,
    answer: (
      <div>
        <li>
          You may view our point structure at{' '}
          <span className="underline">
            <Link href="/about">Phase 3 Info Page</Link>
          </span>{'.'}
        </li>
      </div>
    ),
  },
  {
    question: `What do points do?`,
    id: `what-do-points-do`,
    answer: (
      <div>
        <li>
          We have set aside a portion of the genesis block $IRON 
          exclusively for incentivized testnet users.
          </li>
        <li>
          Upon eligibility, your Phase 1 & 2 points will be proportionally 
          translated to tokens from this block upon mainnet launch.
          </li>
      </div>
    ),
  },
  {
    question: `How do I mint an asset?`,
    id: `how-to-mint`,
    answer: (
      <div>
        <li>Make sure you use your registered <i>graffiti</i> as your asset name.</li>
        <li>Run <code><b>ironfish wallet:mint</b></code> to mint your asset.</li>
        
      </div>
    ),
  },
  {
    question: `How do I burn an asset?`,
    id: `how-to-burn`,
    answer: (
      <div>
        <li>Run <code><b>ironfish wallet:burn</b></code> to burn your asset.</li>
      </div>
    ),
  },
  {
    question: `How do I send an asset?`,
    id: `how-to-send`,
    answer: (
      <div>
        <li>Use the following iron bank address: {' '}
          <span style={{ wordWrap: 'break-word' }}>
            <mark><i>dfc2679369551e64e3950e06a88e68466e813c63b100283520045925adbe59ca</i></mark>
          </span>
          </li>
        <li>Run <code><b>ironfish wallet:send</b></code> to send your asset.</li>        
      </div>
    ),
  },
  {
    question: `How do I get $IRON to pay for mint, burn, & send fees?`,
    id: `how-to-i-get-funds`,
    answer: (
      <div>
        <li>Run <code><b>ironfish faucet</b></code> to request from our faucet.</li>
      </div>
    ),
  },
  {
    question: `How do I host a node in a way that earns me points?`,
    id: `node-points`,
    answer: (
      <div>
        <li>Run <code><b>ironfish testnet</b></code> to configure your <i>graffiti</i> and <i>telemetry</i>.</li>
        <li>Run <code><b>ironfish start</b></code> and leave that process running.</li>
        <li>That should do it ...to gain points every 12 hours.</li>
      </div>
    ),
  },
  {
    question: `Will there be a KYC process for participants to claim coins?`,
    id: 'kyc-process',
    answer: (
      <div>
        <li>Coins will be distributed to eligible participants.</li>
        <li>Most likely a KYC process will be necessary, to determine eligibility.</li>
      </div>
    ),
  },
  {
    question: `What are the minimum hardware requirements for running a node? `,
    id: `minimum-hardware-requirements`,
    answer: (
      <div>
        <li>Suggested requirements from our community:</li>
        <li>CPU: 4 cores</li>
        <li>RAM: 8 GB</li>
      </div>
    ),
  },
  {
    question: `What happened to Phase 1 and 2 points?`,
    id: `phase-1-points`,
    answer: (
      <div>
        <li>We have frozen the leaderboards from prior phases.</li>
        <li>For reference, you may find them here:</li>
        <li>
          <span className="underline">
            <Link href="https://phase1.testnet.ironfish.network/leaderboard">
              Phase 1
            </Link>
          </span>{' '}
          leaderboard.
        </li>
        <li>
          <span className="underline">
            <Link href="https://phase2.testnet.ironfish.network/leaderboard">
              Phase 2
            </Link>
          </span>{' '}
          leaderboard.
        </li>
      </div>
    ),
  },
  {
    question: `What is graffiti? How do I set it up?`,
    id: `graffiti-set-up`,
    answer: (
      <div>
        <li>Graffiti is your personal identifier.</li>
        <li>You need to set it up to get credits for your participation.</li>
        <li>Run <code><b>ironfish testnet</b></code> for your setup.</li>
        <li>
            Check out our{' '}
            <span className="underline">
              <Link href="https://ironfish.network/docs/onboarding/iron-fish-tutorial"> Get Started </Link>
            </span>{' '}
            tutorial for more details!
        </li>
      </div>
    ),
  },
  {
    question: `Can I claim points for blocks under a different graffiti than the one I registered with? `,
    id: `different-graffiti`,
    answer: (
      <div>
        <li>Please{' '}
          <span className="underline">
            <Link href="/signup">Register</Link>
          </span>{' '}
          your <i>graffiti</i> to start earning points.
        </li>
        <li>Points can be claimed, when you use the same <i>graffiti</i> used in the registration step.</li>
      </div>
    ),
  },
  {
    question: `Will my accounts transfer from prior phases?`,
    id: 'account-transfer',
    answer: (
      <div>
        <li>If you've setup your <i>graffiti</i> in Phase 1 & 2, you don't have to register again in Phase 3.</li>
        <li>Yes, accounts with identical <i>graffiti</i> will carry over from Phase 1 & 2.</li>
      </div>
    ),
  },
  {
    question: `Will there be weekly limits on earning points?`,
    id: 'weekly-limits',
    answer: (
      <div>
        <li>Yes, each <i>graffiti</i> will be able to earn points, once a week, for creating the multiasset transactions.</li>
      </div>
    ),
  },
  {
    question: `How will Phase 3 be fair for new users starting?`,
    id: 'phase-2-fairness',
    answer: (
      <div>
        <li>We have set aside blocks of the initial pool of $IRON tokens separately for Phase 1, Phase 2, and Phase 3.</li>
        <li>Congratulations!, if you managed to score a high ranking on the leaderboard in Phase 1 or 2.</li>
        <li>You and Everyone else, start with <mark>zero</mark> points in Phase 3.</li>
        <li>We designed this, such that everyone gets a fair and equal shot in Phase 3. You’re not too late!</li>
      </div>
    ),
  },
  {
    question:
      'I get the error, "Your database needs to be upgraded (v10 vs v14)."',
    id: 'database-error',
    answer: (
      <div>
        <li>You might be running an old phase 2 database.</li>
        <li>Delete your <i>datadir</i> located at <code>~/.ironfish</code></li>
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
