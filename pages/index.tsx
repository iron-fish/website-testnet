import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


        <Navbar fill="black" className="bg-white text-black" />

        <main className="bg-iforange flex-1">
          <h1 className="text-2xl">Welcome to Testnet.</h1>
        </main>


      <Footer />
    </div>
  )
}
