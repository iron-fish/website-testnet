import Head from 'next/head'
import clsx from 'clsx'

import KeepReading from 'components/KeepReading'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import PageBanner from 'components/PageBanner'
import TubesCTA from 'components/FooterCTA'
import { LoginContext } from 'hooks/useLogin'

import Stories from 'components/Community/Stories'
type CommunityProps = {
  loginContext: LoginContext
}

export default function Community({ loginContext }: CommunityProps) {
  return (
    <div className={clsx('min-h-screen', 'flex', 'flex-col', 'font-favorit')}>
      <Head>
        <title>Community</title>
        <meta name="description" content="Community" />
      </Head>

      <Navbar
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
          title="From the Community"
          text="Submitting to our community page helps us make our testnet more accessible. Send us an email on how you’d like to grow our community, we’d love to talk!"
          buttonText="Submit Contribution Proposal"
          buttonClassName={clsx(
            'm-auto',
            'mb-32',
            'w-full',
            'max-w-[364px]',
            'text-lg',
            'p-3',
            'md:text-xl',
            'md:py-5',
            'md:px-4'
          )}
          buttonLink="mailto:testnet@ironfish.network"
        />
        <div className={clsx('w-4/5', 'md:w-2/3')}>
          <Stories />
        </div>
        <TubesCTA
          cta="Join the Testnet!"
          buttonText="Join Now"
          goTo="/signup"
        />
        <KeepReading background="bg-ifbeige" />
      </main>
      <Footer />
    </div>
  )
}
