import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import OffsetBorderContainer from '../../components/OffsetBorderContainer'

import * as API from '../../apiClient'
import FishAvatar from '../../components/user/FishAvatar'

type Props = {
  events: ReadonlyArray<API.ApiEvent>
  user: API.ApiUser
}

function displayEventType(type: API.EventType): string {
  switch (type) {
    case 'BLOCK_MINED':
      return 'Mined a block'
    case 'BUG_CAUGHT':
      return 'Reported a bug'
    case 'COMMUNITY_CONTRIBUTION':
      return 'Contributed to the community'
    case 'NODE_HOSTED':
      return 'Hosted a node'
    case 'PULL_REQUEST_MERGED':
      return 'Merged a pull request'
    case 'SOCIAL_MEDIA_PROMOTION':
      return 'Promoted testnet'
    default:
      return type
  }
}

function TabsContent() {}

type MetricCardProp = {
  description: string
  metricValue: number
  metricValueMax: number
  pointsValue: number
}

function MetricCard({
  description,
  metricValue,
  metricValueMax,
  pointsValue,
}: MetricCardProp) {
  return (
    <OffsetBorderContainer>
      <div className="p-8" style={{ minWidth: 288 }}>
        <div className="font-extended mb-4 whitespace-nowrap">
          {description}
        </div>
        <div className="flex gap-4">
          <div className="font-extended text-5xl">
            {metricValue.toLocaleString()}
          </div>
          <div className="mt-1">
            <div className="font-favorit leading-tight">{`/ ${metricValueMax.toLocaleString()}`}</div>
            <div className="font-favorit text-ifsubtextgray leading-tight whitespace-nowrap	">{`${pointsValue.toLocaleString()} points`}</div>
          </div>
        </div>
      </div>
    </OffsetBorderContainer>
  )
}

const fishAvatarColors = [
  '#FFAFAF',
  '#94ED6B',
  '#A3E9FF',
  '#7657CE',
  '#E7B453',
  '#54FF17',
  '#1D4423',
  '#D46161',
  '#AFF1FF',
  '#F1CB00',
]

// djb2 (xor)
function getColor(graffiti: string): string {
  let hash = 5381

  for (let i = 0; i < graffiti.length; i++) {
    hash = (hash * 33) ^ graffiti.charCodeAt(i)
  }

  return fishAvatarColors[(hash >>> 0) % fishAvatarColors.length]
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
  const avatarColor = getColor(user.graffiti)

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{user.graffiti}</title>
        <meta name="description" content={String(user.graffiti)} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-ifpink text-black" />

      <main className="bg-ifpink flex-1 items-center flex flex-col pt-16 pb-32">
        <OffsetBorderContainer>
          <div className="px-24 pt-16 pb-12">
            {/* Header */}
            <div className="flex justify-between">
              <div>
                <h1 className="font-extended text-6xl mt-6 mb-8">
                  {user.graffiti}
                </h1>

                <div className="font-favorit flex flex-wrap gap-x-16 gap-y-2">
                  <div>
                    <div>All Time Rank</div>
                    <div className="text-3xl">1st</div>
                  </div>
                  <div>
                    <div>Total Points</div>
                    <div className="text-3xl">
                      {user.total_points.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div>Weekly Points</div>
                    <div className="text-3xl">
                      {user.total_points.toLocaleString()} /{' '}
                      {user.total_points.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <FishAvatar color={avatarColor} />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 mt-8 mb-12 flex-wrap">
              <div className="flex-1">
                <MetricCard
                  description="Blocks Mined"
                  metricValue={79}
                  metricValueMax={100}
                  pointsValue={790}
                />
              </div>
              <div className="flex-1">
                <MetricCard
                  description="Bugs Caught"
                  metricValue={10}
                  metricValueMax={10}
                  pointsValue={1000}
                />
              </div>
              <div className="flex-1">
                <MetricCard
                  description="Promotions"
                  metricValue={2}
                  metricValueMax={10}
                  pointsValue={200}
                />
              </div>
              <div className="flex-1">
                <MetricCard
                  description="PRs Merged"
                  metricValue={2}
                  metricValueMax={2}
                  pointsValue={1000}
                />
              </div>
              <div className="flex-1">
                <MetricCard
                  description="Community Contributions"
                  metricValue={0}
                  metricValueMax={1}
                  pointsValue={0}
                />
              </div>
            </div>

            {/* Recent Activity */}
            <h1 className="font-favorit">Recent Activity</h1>

            <table className="font-favorit w-full">
              <thead>
                <tr className="font-normal text-xs text-left tracking-widest border-b border-black">
                  <th className="py-3">ACTIVITY</th>
                  <th>DATE</th>
                  <th>POINTS EARNED</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {events.map(e => (
                  <tr key={e.id} className="border-b border-black">
                    <td className="py-3">{displayEventType(e.type)}</td>
                    <td>{new Date(e.occurred_at).toLocaleString()}</td>
                    <td>{e.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </OffsetBorderContainer>
      </main>

      <Footer />
    </div>
  )
}
