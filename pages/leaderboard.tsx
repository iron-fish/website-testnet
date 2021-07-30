import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import * as API from '../api'

type Props = {
  users: ReadonlyArray<API.ApiUser>,
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


        <Navbar fill="black" className="bg-white text-black" />

        <main className="bg-iforange flex-1 items-center flex flex-col">
          <h1 className="text-2xl">Leaderboard</h1>

          <table>
            <thead>
              <th>ID</th>
              <th>Email</th>
              <th>Graffiti</th>
              <th>Total Points</th>
              <th>Discord</th>
              <th>Telegram</th>
              <th>Created At</th>
              <th>Updated At</th>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td><Link href={`/users/${user.id}`}><a className="underline">{user.email}</a></Link></td>
                    <td>{user.graffiti}</td>
                    <td>{user.total_points}</td>
                    <td>{user.discord_username}</td>
                    <td>{user.telegram_username}</td>
                    <td>{user.created_at}</td>
                    <td>{user.updated_at}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </main>

      <Footer />
    </div>
  )
}
