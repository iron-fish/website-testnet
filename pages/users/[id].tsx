import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

import * as API from '../../apiClient'

type Props = {
  events: ReadonlyArray<API.ApiEvent>
  user: API.ApiUser
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  if (typeof context.query.id !== 'string') {
    return {
      notFound: true,
    }
  }

  const [user, events] = await Promise.all([
    API.getUser(context.query.id),
    API.listEvents(context.query.id),
  ])

  if ('error' in events || 'error' in user) {
    return {
      notFound: true,
    }
  }

  return {
    props: { events: events.data, user: user },
  }
}

export default function User({ events, user }: Props) {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{id}</title>
        <meta name="description" content={String(id)} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-iforange text-black" />

      <main className="bg-iforange flex-1 items-center flex flex-col">
        <h1 className="text-2xl">User: {user.graffiti}</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Graffiti</th>
              <th>Total Points</th>
              <th>Discord</th>
              <th>Telegram</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.graffiti}</td>
              <td>{user.total_points}</td>
              <td>{user.discord_username}</td>
              <td>{user.telegram_username}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
            </tr>
          </tbody>
        </table>

        <h1 className="text-2xl">Events: {events.length}</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Points</th>
              <th>Occurred At</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {events.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.type}</td>
                <td>{e.points}</td>
                <td>{e.occurred_at}</td>
                <td>{e.created_at}</td>
                <td>{e.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  )
}
