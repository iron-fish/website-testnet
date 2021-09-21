import Head from 'next/head'

import KeepReading from 'components/KeepReading'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import PageBanner from 'components/PageBanner'
import TubesCTA from 'components/FooterCTA'

import Stories from 'components/Community/Stories'

export default function Community() {
  return (
    <div className="min-h-screen flex flex-col font-favorit">
      <Head>
        <title>Community</title>
        <meta name="description" content="Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-ifbeige text-black" />

      <main className="bg-ifbeige flex-1 items-center flex flex-col">
        <PageBanner
          title="From the Community"
          text="Submitting to our community page helps us make our testnet more accessible. Send us an email on how you’d like to grow our community, we’d love to talk!"
          buttonText="Submit Contribution Proposal"
          buttonClassName="mb-16"
          buttonLink="mailto:testnet@ironfish.network"
        />
        <Stories />
        <TubesCTA cta="Join the Testnet" buttonText="Join Now" goTo="/signup" />
        <KeepReading background="bg-ifbeige" />
      </main>
      <Footer />
    </div>
  )
}
