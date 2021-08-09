import Head from "next/head"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>FAQ</title>
        <meta name="description" content="FAQ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-iforange text-black" />

      <main className="bg-iforange flex-1">
        <h1 className="text-2xl">Welcome to FAQ.</h1>
      </main>

      <Footer />
    </div>
  )
}
