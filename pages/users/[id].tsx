import { useCallback, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import { encode as btoa } from 'base-64'
import { nextMonday } from 'date-fns'
import clsx from 'clsx'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import Loader from 'components/Loader'
import { Container as OffsetBorderContainer } from 'components/OffsetBorder'
import PaginationButton from 'components/PaginationButton'
import FishAvatar from 'components/user/FishAvatar'
import Flag from 'components/user/Flag'
import Tabs, { TabType } from 'components/user/Tabs'
import renderEvents from 'components/user/EventRow'
import Twitter from 'components/icons/Twitter'

import * as API from 'apiClient'
import useQuery from 'hooks/useQuery'
import usePaginatedEvents from 'hooks/usePaginatedEvents'
import { LoginContext } from 'hooks/useLogin'
import { useQueriedToast, Toast, Alignment } from 'hooks/useToast'

import { graffitiToColor, numberToOrdinal } from 'utils'
import { formatUTC, nextMondayFrom } from 'utils/date'

// The number of events to display in the Recent Activity list.
const EVENTS_LIMIT = 25

const validTabValue = (x: string) =>
  x === 'weekly' || x === 'all' || x === 'settings'

interface Props {
  showNotification: boolean
  loginContext: LoginContext
}
// const sumValues = (x: Record<string, number>) =>
//   Object.values(x).reduce((a, b) => a + b, 0)

type LabeledProps = {
  value: string
  label: string
}

export const LabeledStat = ({ value, label }: LabeledProps) => (
  <div className={clsx('w-1/3', 'flex', 'flex-col')}>
    <h3 className={clsx('text-sm', 'md:text-md')}>{label}</h3>
    <div className={clsx('text-xl', 'md:text-3xl', 'mt-2')}>{value}</div>
  </div>
)

const rand = (x: number) => Math.round(Math.random() * x)

// eslint-disable-next-line
const once = (fn: any) => {
  // eslint-disable-next-line
  // @ts-ignore
  let y
  // eslint-disable-next-line
  // @ts-ignore
  const c = (...args) => {
    // eslint-disable-next-line
    // @ts-ignore
    if (y) return y
    y = fn(...args)
  }
  return c
}

export default function User({ showNotification, loginContext }: Props) {
  const $toast = useQueriedToast({
    queryString: 'toast',
    duration: 8e3,
  })
  const router = useRouter()
  const { isReady: routerIsReady } = router
  const userId = (router?.query?.id || '') as string
  const rawTab = useQuery('tab')
  const [$activeTab, $setActiveTab] = useState<TabType>('all')

  const [$user, $setUser] = useState<API.ApiUser | undefined>(undefined)

  const [$events, $setEvents] = useState<API.ListEventsResponse | undefined>(
    undefined
  )
  const [$allTimeMetrics, $setAllTimeMetrics] = useState<
    API.UserMetricsResponse | undefined
  >(undefined)
  const [$weeklyMetrics, $setWeeklyMetrics] = useState<
    API.UserMetricsResponse | undefined
  >(undefined)
  const [$metricsConfig, $setMetricsConfig] = useState<
    API.MetricsConfigResponse | undefined
  >(undefined)
  const [$fetched, $setFetched] = useState(false)

  useEffect(() => {
    if (rawTab && validTabValue(rawTab)) {
      $setActiveTab(rawTab as TabType)
    }
  }, [rawTab])

  useEffect(() => {
    let isCanceled = false

    const fetchData = async () => {
      try {
        if (!routerIsReady || $fetched) {
          return
        }
        const raw = await Promise.all([
          API.getUser(userId),
          API.listEvents({
            userId,
            limit: EVENTS_LIMIT,
          }),
          API.getUserAllTimeMetrics(userId),
          API.getUserWeeklyMetrics(userId),
          API.getMetricsConfig(),
        ])
        const [user, events, allTimeMetrics, weeklyMetrics, metricsConfig] = raw
        // eslint-disable-next-line no-console
        console.log({
          user,
          events,
          allTimeMetrics,
          weeklyMetrics,
          metricsConfig,
        })
        if (isCanceled) {
          return
        }

        if (
          'error' in user ||
          API.isGenericError(user) ||
          'error' in events ||
          API.isGenericError(events) ||
          'error' in allTimeMetrics ||
          API.isGenericError(allTimeMetrics) ||
          'error' in weeklyMetrics ||
          API.isGenericError(weeklyMetrics) ||
          'error' in metricsConfig ||
          API.isGenericError(metricsConfig)
        ) {
          Router.push(
            `/leaderboard?toast=${btoa(
              'An error occurred while fetching user data'
            )}`
          )
          return
        }
        $setUser(user)
        // this jams some new events at the top of every activity feed for debugging porpoises
        // and fudges some data for the metrics
        // TODO: REMOVE THIS BEFORE MERGING
        once(() => {
          const online = {
            count: rand(10),
            points: 100,
          }
          allTimeMetrics.metrics.transactions_sent = online
          const lastDate = events.data[0].occurred_at
          // eslint-disable-next-line
          // @ts-ignore
          events.data = events.data.concat([
            {
              id: rand(200),
              occurred_at: lastDate,
              points: 100,
              type: API.EventType.NODE_HOSTED,
              user_id: user.id,
            },
            {
              id: rand(200),
              metadata: {
                hash: '00000000000a15c8d3d49f4f2316d3a590de6e20cc196fd68b658ee8d5ef22a7',
              },
              occurred_at: lastDate,
              points: 100,
              type: API.EventType.TRANSACTION_SENT,
              user_id: user.id,
            },
          ])
        })()
        $setEvents(events)
        $setAllTimeMetrics(allTimeMetrics)
        $setWeeklyMetrics(weeklyMetrics)
        $setMetricsConfig(metricsConfig)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e)

        throw e
      }
    }

    fetchData()
    return () => {
      isCanceled = true
    }
  }, [
    routerIsReady,
    userId,
    loginContext?.metadata?.id,
    loginContext?.metadata?.graffiti,
    $fetched,
  ])

  useEffect(() => {
    if (!$user) {
      return
    }
    $setFetched(true)
  }, [$user])

  // Recent Activity hooks
  const { $hasPrevious, $hasNext, fetchPrevious, fetchNext } =
    usePaginatedEvents(userId, EVENTS_LIMIT, $events, $setEvents)

  // Tab hooks
  const onTabChange = useCallback((t: TabType) => {
    $setActiveTab(t)
  }, [])

  if (
    !$user ||
    !$allTimeMetrics ||
    !$metricsConfig ||
    !$weeklyMetrics ||
    !$events
  ) {
    return <Loader />
  }

  const avatarColor = graffitiToColor($user.graffiti)
  const ordinalRank = numberToOrdinal($user.rank)
  const startDate = new Date(2021, 11, 1)
  const endDate = nextMondayFrom(nextMonday(new Date()))
  const joinedOn = formatUTC($user.created_at, `'Joined' MMMM do',' y`)
  /*
  const totalWeeklyLimit = sumValues(
    $metricsConfig.weekly_limits
  ).toLocaleString()
  const weeklyPoints = $weeklyMetrics.points.toLocaleString()
   */

  const tweetText = `Iron Fish Incentivized Testnet: ${
    $user.graffiti
  } - ${$user.total_points.toLocaleString()} total points! #ironfish https://testnet.ironfish.network/users/${userId}`

  return (
    <div className={clsx('min-h-screen', 'flex', 'flex-col')}>
      <Head>
        <title>{$user.graffiti}</title>
        <meta name="description" content={String($user.graffiti)} />
      </Head>

      <Navbar
        showNotification={showNotification}
        loginContext={loginContext}
        fill="black"
        className={clsx('bg-ifpink', 'text-black')}
      />

      <main
        className={clsx(
          'bg-ifpink',
          'flex-1',
          'justify-center',
          'flex',
          'pt-16',
          'pb-32',
          'w-full',
          'overflow-hidden'
        )}
      >
        <div style={{ flexBasis: 1138 }}>
          <OffsetBorderContainer>
            <div
              className={clsx(
                'px-5',
                'md:px-8',
                'tablet:px-24',
                'pt-5',
                'md:pt-8',
                'tablet:pt-16',
                'pb-12'
              )}
            >
              {/* Header */}
              <div
                className={clsx('flex', 'justify-between', 'md:mb-8')}
                style={{ width: '100%' }}
              >
                <div className={clsx('flex', 'flex-col')}>
                  <h1
                    className={clsx(
                      'font-extended',
                      'text-3xl',
                      'md:text-6xl',
                      'mt-2',
                      'md:mt-6',
                      'mb-4',
                      'max-w-[32rem]',
                      'md:max-w-[48rem]',
                      'md:h-[4rem]',
                      'overflow-hidden',
                      'truncate'
                    )}
                  >
                    {$user.graffiti}
                  </h1>
                  <div>
                    <div
                      className={clsx(
                        'text-sm',
                        'md:text-md',
                        'px-2',
                        'py-2',
                        'bg-iflightbeige',
                        'inline-block',
                        'md:mb-12',
                        'rounded'
                      )}
                    >
                      {joinedOn}
                    </div>
                  </div>
                </div>
                <div
                  className={clsx(
                    'flex',
                    'flex-col',
                    'items-center',
                    'justify-center'
                  )}
                >
                  <FishAvatar color={avatarColor} />
                  <div
                    className={clsx(
                      'mt-4',
                      'flex',
                      'flex-row',
                      'items-center',
                      'justify-center',
                      'h-6',
                      'w-full'
                    )}
                  >
                    Phase 2
                  </div>
                  <div
                    className={clsx(
                      'mt-4',
                      'flex',
                      'flex-row',
                      'items-center',
                      'justify-center',
                      'h-6',
                      'w-full'
                    )}
                  >
                    <Flag code={$user.country_code} />
                    <a
                      className="twitter-share-button"
                      rel="noreferrer"
                      target="_blank"
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        tweetText
                      )}`}
                    >
                      <Twitter className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
              <div
                className={clsx('flex', 'flex-col', 'w-1/2', 'mt-6', 'mb-6')}
              >
                <div
                  className={clsx(
                    'w-full',
                    'md:w-2/3',
                    'flex',
                    'content-between',
                    'justify-between'
                  )}
                >
                  <LabeledStat label="Phase 2 Rank" value={ordinalRank} />
                  <LabeledStat
                    label="Phase 2 Points"
                    value={$user.total_points.toLocaleString()}
                  />
                </div>
              </div>

              {/* Tabs */}
              <Tabs
                setRawMetadata={loginContext.setRawMetadata}
                setUserStatus={loginContext.setStatus}
                reloadUser={loginContext.reloadUser}
                toast={$toast}
                activeTab={$activeTab}
                onTabChange={onTabChange}
                user={$user}
                authedUser={loginContext.metadata}
                allTimeMetrics={$allTimeMetrics}
                weeklyMetrics={$weeklyMetrics}
                metricsConfig={$metricsConfig}
                setFetched={$setFetched}
                setUser={$setUser}
              />

              {/* Recent Activity */}
              {$activeTab !== 'settings' && (
                <>
                  <h1 className="font-favorit" id="recent-activity">
                    Recent Activity
                  </h1>

                  <table className={clsx('font-favorit', 'w-full')}>
                    <thead>
                      <tr
                        className={clsx(
                          'text-xs',
                          'text-left',
                          'tracking-widest',
                          'border-b',
                          'border-black',
                          'font-normal'
                        )}
                      >
                        <th className={'py-4'}>ACTIVITY</th>
                        <th className={clsx('hidden', 'md:table-cell')}>
                          DATE
                        </th>
                        <th>
                          <div className={clsx('block', 'w-1/2')}>POINTS</div>
                        </th>
                        <th
                          className={clsx(
                            'hidden',
                            'md:table-cell',
                            'md:max-w-[13rem]',
                            'text-right'
                          )}
                        >
                          DETAILS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {renderEvents(startDate, endDate, $events.data)}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </OffsetBorderContainer>
          {/* Recent Activity Pagination */}
          {$activeTab !== 'settings' && (
            <div
              className={clsx('flex', 'font-favorit', 'justify-center', 'mt-8')}
            >
              <div className={clsx('flex', 'gap-x-1.5')}>
                <PaginationButton
                  disabled={!$hasPrevious}
                  onClick={fetchPrevious}
                >{`<< Previous`}</PaginationButton>
                <div>{`|`}</div>
                <PaginationButton
                  disabled={!$hasNext}
                  onClick={fetchNext}
                >{`Next >>`}</PaginationButton>
              </div>
            </div>
          )}
        </div>
      </main>
      <Toast
        showNotification={showNotification}
        message={$toast.message}
        visible={$toast.visible}
        alignment={Alignment.Top}
      />
      <Footer />
    </div>
  )
}
