import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import Loader from 'components/Loader'
import { Container as OffsetBorderContainer } from 'components/OffsetBorder'
import EventsPaginationButton from 'components/user/EventsPaginationButton'
import FishAvatar from 'components/user/FishAvatar'
import Flag from 'components/user/Flag'
import Tabs, { TabType } from 'components/user/Tabs'
import renderEvents from 'components/user/EventRow'
import usePaginatedEvents from 'hooks/usePaginatedEvents'
import { encode as btoa } from 'base-64'

import * as API from 'apiClient'
import { graffitiToColor, numberToOrdinal } from 'utils'
import { LoginContext } from 'hooks/useLogin'

// The number of events to display in the Recent Activity list.
const EVENTS_LIMIT = 7

interface Props {
  loginContext: LoginContext
}

export default function User({ loginContext }: Props) {
  const router = useRouter()

  const [$user, $setUser] = React.useState<API.ApiUser | undefined>(undefined)
  const [$events, $setEvents] = React.useState<
    API.ListEventsResponse | undefined
  >(undefined)
  const [$allTimeMetrics, $setAllTimeMetrics] = React.useState<
    API.UserMetricsResponse | undefined
  >(undefined)
  const [$weeklyMetrics, $setWeeklyMetrics] = React.useState<
    API.UserMetricsResponse | undefined
  >(undefined)
  const [$metricsConfig, $setMetricsConfig] = React.useState<
    API.MetricsConfigResponse | undefined
  >(undefined)

  useEffect(() => {
    let isCanceled = false

    const fetchData = async () => {
      if (!router.isReady) {
        return
      }

      if (!router.query.id || Array.isArray(router.query.id)) {
        router.push(`/leaderboard?toast=${btoa('Unable to find that user')}`)
        return
      }

      const [user, events, allTimeMetrics, weeklyMetrics, metricsConfig] =
        await Promise.all([
          API.getUser(router.query.id),
          API.listEvents({
            userId: router.query.id,
            limit: EVENTS_LIMIT,
          }),
          API.getUserAllTimeMetrics(router.query.id),
          API.getUserWeeklyMetrics(router.query.id),
          API.getMetricsConfig(),
        ])

      if (isCanceled) {
        return
      }

      if (
        'error' in user ||
        'error' in events ||
        'error' in allTimeMetrics ||
        'error' in weeklyMetrics ||
        'error' in metricsConfig
      ) {
        router.push(
          `/leaderboard?toast=${btoa(
            'An error occurred while fetching user data'
          )}`
        )
        return
      }

      $setUser(user)
      $setEvents(events)
      $setAllTimeMetrics(allTimeMetrics)
      $setWeeklyMetrics(weeklyMetrics)
      $setMetricsConfig(metricsConfig)
    }

    fetchData()
    return () => {
      isCanceled = true
    }
  }, [router])

  const id = ($user && $user.id && $user.id.toString()) || 'unknown'
  // Recent Activity hooks
  const { $hasPrevious, $hasNext, fetchPrevious, fetchNext } =
    usePaginatedEvents(id, EVENTS_LIMIT, $events, $setEvents)

  // Tab hooks
  const [$activeTab, $setActiveTab] = React.useState<TabType>('weekly')
  const onTabChange = React.useCallback((tab: TabType) => {
    $setActiveTab(tab)
  }, [])
  if (
    !$user ||
    !$allTimeMetrics ||
    !$metricsConfig ||
    !$weeklyMetrics ||
    !$events ||
    id === 'unknown'
  ) {
    return <Loader />
  }
  const avatarColor = graffitiToColor($user.graffiti)
  const ordinalRank = numberToOrdinal($user.rank)

  const totalWeeklyLimit = Object.values($metricsConfig.weekly_limits).reduce(
    (acc, cur) => acc + cur,
    0
  )
  // eslint-disable-next-line no-console
  console.log({ $events })

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{$user.graffiti}</title>
        <meta name="description" content={String($user.graffiti)} />
      </Head>

      <Navbar
        loginContext={loginContext}
        fill="black"
        className="bg-ifpink text-black"
      />

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
                    {$user.graffiti}
                  </h1>

                  <div className="font-favorit flex flex-wrap gap-x-16 gap-y-2">
                    <div>
                      <div>All Time Rank</div>
                      <div className="text-3xl mt-2">{ordinalRank}</div>
                    </div>
                    <div>
                      <div>Total Points</div>
                      <div className="text-3xl mt-2">
                        {$user.total_points.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div>Weekly Points</div>
                      <div className="text-3xl mt-2">
                        {$weeklyMetrics.points.toLocaleString()} /{' '}
                        {totalWeeklyLimit.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <FishAvatar color={avatarColor} />
                  <div className="mt-4">
                    <Flag code={$user.country_code} />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs
                activeTab={$activeTab}
                onTabChange={onTabChange}
                user={$user}
                authedUser={loginContext.metadata}
                allTimeMetrics={$allTimeMetrics}
                weeklyMetrics={$weeklyMetrics}
                metricsConfig={$metricsConfig}
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
                        <th className="font-normal">DETAILS</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {renderEvents($events.data as API.ApiEvent[])}
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
}
