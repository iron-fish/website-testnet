import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import Debug from 'components/Debug'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { Container as OffsetBorderContainer } from 'components/OffsetBorder'
import EventsPaginationButton from 'components/user/EventsPaginationButton'
import FishAvatar from 'components/user/FishAvatar'
import Flag from 'components/user/Flag'
import Tabs, { TabType } from 'components/user/Tabs'
import usePaginatedEvents from 'hooks/usePaginatedEvents'
import { encode as btoa } from 'base-64'

import * as API from 'apiClient'
import { graffitiToColor, numberToOrdinal } from 'utils'
import { LoginContext } from 'contexts/LoginContext'

// The number of events to display in the Recent Activity list.
const EVENTS_LIMIT = 7

type Props = {
  events: API.ListEventsResponse
  user?: API.ApiUser
  allTimeMetrics: API.UserMetricsResponse
  weeklyMetrics: API.UserMetricsResponse
  metricsConfig: API.MetricsConfigResponse
}
type Redirectable = {
  destination: string
  permanent: boolean
}

type Redirect = {
  redirect: Redirectable
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

export const getServerSideProps: GetServerSideProps<Props | Redirect> =
  async context => {
    const failure = {
      redirect: {
        destination: `/leaderboard?toast=${btoa('Unable to find that user')}`,
        permanent: false,
      },
    }
    try {
      if (typeof context.query.id !== 'string') {
        return failure
      }
      const [user, events, allTimeMetrics, weeklyMetrics, metricsConfig] =
        await Promise.all([
          API.getUser(context.query.id),
          API.listEvents({ userId: context.query.id, limit: EVENTS_LIMIT }),
          API.getUserAllTimeMetrics(context.query.id),
          API.getUserWeeklyMetrics(context.query.id),
          API.getMetricsConfig(),
        ])
      // eslint-disable-next-line
      const fUser = user as any
      if (!fUser || (fUser && !fUser.id)) {
        return failure
      }
      if (
        'error' in events ||
        'error' in user ||
        'error' in allTimeMetrics ||
        'error' in weeklyMetrics ||
        'error' in metricsConfig
      ) {
        return failure
      }

      return {
        props: {
          events: events,
          user: user,
          allTimeMetrics: allTimeMetrics,
          weeklyMetrics: weeklyMetrics,
          metricsConfig: metricsConfig,
        },
      }
    } catch (e) {
      return failure
    }
  }

export default function User({
  events,
  user,
  allTimeMetrics,
  weeklyMetrics,
  metricsConfig,
}: Props) {
  const id = (user && user.id && user.id.toString()) || 'unknown'
  // Recent Activity hooks
  const { $events, $hasPrevious, $hasNext, fetchPrevious, fetchNext } =
    usePaginatedEvents(id, EVENTS_LIMIT, events)

  // Tab hooks
  const [$activeTab, $setActiveTab] = React.useState<TabType>('weekly')
  const onTabChange = React.useCallback((tab: TabType) => {
    $setActiveTab(tab)
  }, [])
  if (!user || id === 'unknown') {
    return (
      <Debug
        {...{ events, user, allTimeMetrics, weeklyMetrics, metricsConfig }}
      />
    )
  }

  return (
    <LoginContext.Consumer>
      {({ metadata }) => {
        const avatarColor = graffitiToColor(user.graffiti)
        const ordinalRank = numberToOrdinal(user.rank)

        const totalWeeklyLimit = Object.values(
          metricsConfig.weekly_limits
        ).reduce((acc, cur) => acc + cur, 0)

        return (
          <div className="min-h-screen flex flex-col">
            <Head>
              <title>{user.graffiti}</title>
              <meta name="description" content={String(user.graffiti)} />
            </Head>

            <Navbar fill="black" className="bg-ifpink text-black" />

            <main className="bg-ifpink flex-1 justify-center flex pt-16 pb-32">
              <div style={{ flexBasis: 1138 }}>
                <OffsetBorderContainer>
                  <div className="px-24 pt-16 pb-12">
                    {/* Header */}
                    <div
                      className="flex justify-between mb-8"
                      style={{ width: '100%' }}
                    >
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
                      activeTab={$activeTab}
                      onTabChange={onTabChange}
                      userMetadata={metadata}
                      allTimeMetrics={allTimeMetrics}
                      weeklyMetrics={weeklyMetrics}
                      metricsConfig={metricsConfig}
                    />

                    {/* Recent Activity */}
                    {$activeTab !== 'settings' && (
                      <>
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
                            {$events.map(e => (
                              <tr key={e.id} className="border-b border-black">
                                <td className="py-4">
                                  {displayEventType(e.type)}
                                </td>
                                <td>
                                  {new Date(e.occurred_at).toLocaleString()}
                                </td>
                                <td>{e.points}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                </OffsetBorderContainer>
                {/* Recent Activity Pagination */}
                {$activeTab !== 'settings' && (
                  <div className="flex font-favorit justify-center mt-8">
                    <div className="flex gap-x-1.5">
                      <EventsPaginationButton
                        disabled={!$hasPrevious}
                        onClick={fetchPrevious}
                      >{`<< Previous`}</EventsPaginationButton>
                      <div>{`|`}</div>
                      <EventsPaginationButton
                        disabled={!$hasNext}
                        onClick={fetchNext}
                      >{`Next >>`}</EventsPaginationButton>
                    </div>
                  </div>
                )}
              </div>
            </main>

            <Footer />
          </div>
        )
      }}
    </LoginContext.Consumer>
  )
}
