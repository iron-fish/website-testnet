import Head from 'next/head'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { LoginContext } from 'contexts/LoginContext'

export default function Home() {
  return (
    <LoginContext.Consumer>
      {({ magicMetadata }) => {
        return (
          <div className="min-h-screen flex flex-col">
            <Head>
              <title>Iron Fish</title>
              <meta
                name="description"
                content="Iron Fish Incentivized Testnet. Iron Fish is a new layer-1 blockchain and the future universal privacy layer for all things crypto."
              />
            </Head>

            <Navbar fill="black" className="bg-iforange text-black" />

            <main className="bg-iforange flex-1">
              <h1 className="text-2xl">
                {magicMetadata && magicMetadata.email
                  ? `Welcome to Testnet, ${magicMetadata.email}!`
                  : `Welcome to Testnet.`}
              </h1>
            </main>

            <Footer />
          </div>
        )
      }}
    </LoginContext.Consumer>
  )
}
