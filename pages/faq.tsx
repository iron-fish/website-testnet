import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import TubesCTA from 'components/FooterCTA'
import PageBanner from 'components/PageBanner'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import KeepReading from 'components/KeepReading'
import QuestionAnswer from 'components/FAQ/QuestionAnswer'

const questions: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: `A common question about the testnet?`,
    answer: `An answer to the question about the testnet.`,
  },
  {
    question: `A common question about the testnet?`,
    answer: `An answer to the question about the testnet.`,
  },
  {
    question: `A common question about the testnet?`,
    answer: `An answer to the question about the testnet.`,
  },
  {
    question: `A common question about the testnet?`,
    answer: `An answer to the question about the testnet.`,
  },
  {
    question: `A common question about the testnet?`,
    answer: `An answer to the question about the testnet.`,
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
    <div className="min-h-screen flex flex-col font-favorit">
      <Head>
        <title>FAQ</title>
        <meta name="description" content="FAQ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-white text-black" />

      <main className="bg-white flex-1 items-center flex flex-col">
        <div className="w-4/5 md:w-2/3">
          <PageBanner
            title="Testnet FAQ"
            text={<PageBannerBody />}
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
}
