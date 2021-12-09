import Head from 'next/head'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { LoginAware } from 'hooks/useLogin'

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: true,
      destination: '/about',
    },
  }
}

interface HomeProps {
  loginContext: LoginAware
}

export default function Home({ loginContext }: HomeProps) {
  const { magicMetadata } = loginContext
  const email = magicMetadata?.email || ''
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Iron Fish</title>
        <meta
          name="description"
          content="Iron Fish Incentivized Testnet. Iron Fish is a new layer-1 blockchain and the future universal privacy layer for all things crypto."
        />
      </Head>

      <Navbar
        fill="black"
        className="bg-iforange text-black"
        loginContext={loginContext}
      />

      <main className="bg-iforange flex-1">
        <h1 className="text-2xl">
          {email ? `Welcome to Testnet, ${email}!` : `Welcome to Testnet.`}
        </h1>
      </main>

      <Footer />
    </div>
  )
}
