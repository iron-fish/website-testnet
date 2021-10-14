import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Head from 'next/head'
import Link from 'next/link'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import Search from 'components/icons/Search'
import BackToTop from 'components/BackToTop'
import { Select } from 'components/Form/Select'
import PageBanner from 'components/PageBanner'
import Toast from 'components/Toast'

import { countries, CountryWithCode } from 'data/countries'
import { defaultErrorText } from 'utils/forms'
import useDebounce from 'hooks/useDebounce'
import { useField } from 'hooks/useForm'
import { useQueriedToast } from 'hooks/useToast'

import * as API from 'apiClient'
import NoResults from 'components/leaderboard/ImageNoResults'
import LeaderboardRow from 'components/leaderboard/LeaderboardRow'
import Loader from 'components/Loader'
type Props = {
  users: ReadonlyArray<API.ApiUser>
}

const TOTAL_POINTS = 'Total Points'

const FIELDS = {
  country: {
    id: 'country',
    label: 'Country',
    options: countries.map(({ code, name }: CountryWithCode) => ({
      name,
      value: code,
    })),
    validation: () => true,
    defaultErrorText,
    useDefault: true,
    defaultValue: 'Global',
    defaultLabel: 'Global',
  },
  eventType: {
    id: 'eventType',
    label: 'eventType',
    options: [
      { name: 'Blocks Mined', value: 'BLOCK_MINED' },
      { name: 'Bugs Caught', value: 'BUG_CAUGHT' },
      { name: 'Promotions', value: 'SOCIAL_MEDIA_PROMOTION' },
      { name: 'PRs Merged', value: 'PULL_REQUEST_MERGED' },
      { name: 'Community Contributions', value: 'COMMUNITY_CONTRIBUTION' },
    ],
    validation: () => true,
    defaultErrorText,
    useDefault: true,
    defaultValue: TOTAL_POINTS,
    defaultLabel: TOTAL_POINTS,
  },
}

export default function Leaderboard({ users = [] }: Props) {
  const { visible: $visible, message: $toast } = useQueriedToast({
    queryString: 'toast',
    duration: 4e3,
  })
  const $country = useField(FIELDS.country)
  const $eventType = useField(FIELDS.eventType)
  const [$users, $setUsers] = useState(users)

  // Search field hooks
  const [$search, $setSearch] = useState('')
  const $debouncedSearch = useDebounce($search, 300)
  const [$hasSearched, $setHasSearched] = useState(false)
  const [$searching, $setSearching] = useState(false)

  useEffect(() => {
    // Drop the initial value, since results will be preloaded
    if (!$hasSearched) {
      $setHasSearched(true)
      return
    }

    const func = async () => {
      $setSearching(true)
      const countrySearch =
        $country && $country.value && $country.value !== 'Global'
          ? { country_code: $country.value }
          : {}
      const eventType =
        $eventType && $eventType.value && $eventType.value !== TOTAL_POINTS
          ? { event_type: $eventType.value }
          : {}
      const result = await API.listLeaderboard({
        search: $debouncedSearch,
        ...countrySearch,
        ...eventType,
      })
      if (!('error' in result)) {
        $setUsers(result.data)
      }
      $setSearching(false)
    }
    func()
    // Don't re-fire the effect when hasSearched updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [$debouncedSearch, $country, $eventType])

  return (
    <div className="min-h-screen flex flex-col font-favorit">
      <Head>
        <title>Leaderboard</title>
        <meta name="description" content="Leaderboard" />
      </Head>
      <Toast message={$toast} visible={$visible} />
      <Navbar fill="black" className="bg-ifpink text-black" />
      <BackToTop />
      <main className="bg-ifpink flex-1 items-center flex flex-col">
        <div className="w-4/5 md:w-2/3">
          <PageBanner
            title="Testnet Leaderboard"
            text="Our incentivized testnet leaderboard shows you who the top point
          getters are for all-time score, miners, bug catchers, net promoters,
          node hosting, and more! Click someone’s user name to see a breakdown
          of their activity."
            buttonText="Sign Up"
            buttonClassName={clsx(
              'm-auto',
              'mb-32',
              'w-full',
              'max-w-[240px]',
              'text-lg',
              'p-3',
              'md:text-xl',
              'md:py-5',
              'md:px-4'
            )}
            buttonLink="/signup"
          />

          <div className="h-16 border border-black rounded flex items-center mb-8">
            <div className="border-r border-black flex h-full items-center w-1/2">
              <div className="pl-4 md:pl-10">
                <Search />
              </div>
              <input
                className="text-lg pl-2 md:pl-5 h-full font-favorit bg-transparent placeholder-black focus:outline-none"
                placeholder="Search"
                onChange={e => {
                  $setSearch(e.target.value)
                }}
                value={$search}
              />
            </div>
            <div className="border-r border-black flex h-full items-center justify-between w-1/4">
              <label className="flex flex-col font-favorit text-xs px-2.5 w-full">
                Region:
                {$country && $country.value && (
                  <Select {...$country} className="text-lg" />
                )}
              </label>
            </div>
            <div className="h-full flex items-center justify-between w-1/4">
              <label className="flex flex-col font-favorit text-xs px-2.5 w-full">
                View:
                {$eventType && $eventType.value && (
                  <Select {...$eventType} className="text-lg" />
                )}
              </label>
            </div>
          </div>
          <div className="font-extended flex px-10 mb-4">
            {$users.length > 0 && (
              <>
                <div className="w-24">RANK</div>
                <div className="flex-1">USERNAME</div>
                <div>TOTAL POINTS</div>
              </>
            )}
          </div>
          {!$hasSearched || $searching ? (
            <Loader />
          ) : !$searching && $hasSearched && $users.length > 0 ? (
            $users.map(user => (
              <div className="mb-3" key={user.id}>
                <Link href={`/users/${user.id}`}>
                  <a>
                    <LeaderboardRow
                      rank={user.rank}
                      graffiti={user.graffiti}
                      points={user.total_points}
                    />
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <NoResults />
          )}

          <div className="mb-24"></div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
