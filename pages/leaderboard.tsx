import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/Button'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Search from '../components/icons/Search'

import * as API from '../apiClient'
import LeaderboardRow from '../components/leaderboard/LeaderboardRow'

type Props = {
  users: ReadonlyArray<API.ApiUser>
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const events = await API.listLeaderboard()

  if ('error' in events) {
    return {
      notFound: true,
    }
  }

  return {
    props: { users: events.data },
  }
}

export default function Leaderboard({ users }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Leaderboard</title>
        <meta name="description" content="Leaderboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-ifpink text-black" />

      <main className="bg-ifpink flex-1 items-center flex flex-col">
        <div className="w-2/3">
          <h1 className="text-center text-6xl mt-24 mb-8 font-extended">
            Testnet Leaderboard
          </h1>
          <p className="text-center text-2xl mb-8 font-favorit">
            Our incentivized testnet leaderboard shows you who the top point
            getters are for all-time score, miners, bug catchers, net promoters,
            node hosting, and more! Click someone’s user name to see a breakdown
            of their activity.
          </p>

          <div className="flex justify-center mb-16">
            <Button className="py-5">
              <a href="mailto:contact@ironfish.network">Get Incentivized</a>
            </Button>
          </div>

          <div className="h-16 border border-black rounded flex items-center mb-8">
            <div className="border-r border-black flex flex-1 h-full items-center">
              <div className="pl-10">
                <Search />
              </div>
              <input
                className="text-lg pl-5 h-full font-favorit bg-transparent placeholder-black focus:outline-none"
                placeholder="Search Leaderboard"
              />
            </div>
            <div className="border-r border-black flex h-full items-center justify-between px-5">
              <label className="flex flex-col font-favorit text-xs">
                Region:
                <input
                  className="text-lg bg-transparent"
                  placeholder="Global"
                />
              </label>
              <Image
                src="/arrow_drop_down_black.png"
                layout="fixed"
                width="24"
                height="24"
                alt=""
              />
            </div>
            <div className="h-full flex items-center justify-between px-5">
              <label className="flex flex-col font-favorit text-xs">
                View:
                <input
                  className="text-lg bg-transparent"
                  placeholder="Total Points"
                />
              </label>
              <Image
                src="/arrow_drop_down_black.png"
                layout="fixed"
                width="24"
                height="24"
                alt=""
              />
            </div>
          </div>

          <div className="font-extended flex px-10 mb-4">
            <div className="w-24">RANK</div>
            <div className="flex-1">USERNAME</div>
            <div>TOTAL POINTS</div>
          </div>

          {users.map(user => (
            <div key={user.id} className="mb-3">
              <LeaderboardRow
                id={user.id}
                rank={user.rank}
                graffiti={user.graffiti}
                points={user.total_points}
              />
            </div>
          ))}

          <div className="mb-24"></div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
