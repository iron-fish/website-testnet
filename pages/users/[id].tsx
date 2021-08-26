import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { Container as OffsetBorderContainer } from 'components/OffsetBorder'
import FishAvatar from 'components/user/FishAvatar'
import Flag from 'components/user/Flag'
import Tabs from 'components/user/Tabs'

import * as API from 'apiClient'
import { graffitiToColor, numberToOrdinal } from 'utils'

type Props = {
  events: ReadonlyArray<API.ApiEvent>
  user: API.ApiUser
  allTimeMetrics: API.UserMetricsResponse
  weeklyMetrics: API.UserMetricsResponse
  metricsConfig: API.MetricsConfigResponse
}

function displayEventType(type: API.EventType): string {
  switch (type) {
    case 'BLOCK_MINED':
      return 'Mined a block'
    case 'BUG_CAUGHT':
      return 'Reported a bug'
    case 'COMMUNITY_CONTRIBUTION':
      return 'Contributed to the community'
    case 'PULL_REQUEST_MERGED':
      return 'Merged a pull request'
    case 'SOCIAL_MEDIA_PROMOTION':
      return 'Promoted testnet'
    default:
      return type
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  if (typeof context.query.id !== 'string') {
    return {
      notFound: true,
    }
  }

  const [user, events, allTimeMetrics, weeklyMetrics, metricsConfig] =
    await Promise.all([
      API.getUser(context.query.id),
      API.listEvents(context.query.id),
      API.getUserAllTimeMetrics(context.query.id),
      API.getUserWeeklyMetrics(context.query.id),
      API.getMetricsConfig(),
    ])

  if (
    'error' in events ||
    'error' in user ||
    'error' in allTimeMetrics ||
    'error' in weeklyMetrics ||
    'error' in metricsConfig
  ) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      events: events.data,
      user: user,
      allTimeMetrics: allTimeMetrics,
      weeklyMetrics: weeklyMetrics,
      metricsConfig: metricsConfig,
    },
  }
}

export default function User({
  events,
  user,
  allTimeMetrics,
  weeklyMetrics,
  metricsConfig,
}: Props) {
  const avatarColor = graffitiToColor(user.graffiti)
  const ordinalRank = numberToOrdinal(user.rank)

  const totalWeeklyLimit = Object.values(metricsConfig.weekly_limits).reduce(
    (acc, cur) => acc + cur,
    0
  )

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
          <div className="px-24 pt-16 pb-12" style={{ maxWidth: 1116 }}>
            {/* Header */}
            <div className="flex justify-between mb-8">
              <div>
                <h1 className="font-extended text-6xl mt-6 mb-8">
                  {user.graffiti}
                </h1>

                <div className="font-favorit flex flex-wrap gap-x-16 gap-y-2">
                  <div>
                    <div>All Time Rank</div>
                    <div className="text-3xl mt-2">{ordinalRank}</div>
                  </div>
                  <div>
                    <div>Total Points</div>
                    <div className="text-3xl mt-2">
                      {user.total_points.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div>Weekly Points</div>
                    <div className="text-3xl mt-2">
                      {weeklyMetrics.points.toLocaleString()} /{' '}
                      {totalWeeklyLimit.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <FishAvatar color={avatarColor} />
                <div className="mt-4">
                  <Flag code={user.country_code} />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              settingsVisible={false}
              allTimeMetrics={allTimeMetrics}
              weeklyMetrics={weeklyMetrics}
              metricsConfig={metricsConfig}
            />

            {/* Recent Activity */}
            <h1 className="font-favorit">Recent Activity</h1>

            <table className="font-favorit w-full">
              <thead>
                <tr className="text-xs text-left tracking-widest border-b border-black">
                  <th className="font-normal py-4">ACTIVITY</th>
                  <th className="font-normal">DATE</th>
                  <th className="font-normal">POINTS EARNED</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {events.map(e => (
                  <tr key={e.id} className="border-b border-black">
                    <td className="py-4">{displayEventType(e.type)}</td>
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
