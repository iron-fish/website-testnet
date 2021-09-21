import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import Search from 'components/icons/Search'
import BackToTop from 'components/BackToTop'
import { Select } from 'components/Form/Select'
import PageBanner from 'components/PageBanner'

import { countries, CountryWithCode } from 'data/countries'
import { defaultErrorText } from 'utils/forms'
import useDebounce from 'hooks/useDebounce'
import { useField } from 'hooks/useForm'

import * as API from 'apiClient'
import NoResults from 'components/leaderboard/ImageNoResults'
import LeaderboardRow from 'components/leaderboard/LeaderboardRow'
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
  view: {
    id: 'view',
    label: 'View',
    options: [
      { name: 'Blocks Mined', value: 'BLOCKS_MINED' },
      { name: 'Bugs Caught', value: 'BUGS_CAUGHT' },
      { name: 'Promotions', value: 'PROMOTIONS' },
      { name: 'PRs Merged', value: 'PRS_MERGED' },
      { name: 'Community Contributions', value: 'COMMUNITY_CONTRIBUTIONS' },
    ],
    validation: () => true,
    defaultErrorText,
    useDefault: true,
    defaultValue: 'Total Points',
    defaultLabel: 'Total Points',
  },
}

export default function Leaderboard({ users }: Props) {
  const $country = useField(FIELDS.country)
  const $view = useField(FIELDS.view)
  const [$users, $setUsers] = useState(users)

  // Search field hooks
  const [$search, $setSearch] = useState('')
  const $debouncedSearch = useDebounce($search, 300)
  const [$hasSearched, $setHasSearched] = useState(false)

  useEffect(() => {
    // Drop the initial value, since results will be preloaded
    if (!$hasSearched) {
      $setHasSearched(true)
      return
    }

    const func = async () => {
      const countrySearch =
        $country && $country.value && $country.value !== 'Global'
          ? { country_code: $country.value }
          : {}
      const result = await API.listLeaderboard({
        search: $debouncedSearch,
        ...countrySearch,
      })
      if (!('error' in result)) {
        $setUsers(result.data)
      }
    }
    func()
    // Don't re-fire the effect when hasSearched updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [$debouncedSearch, $country])

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Leaderboard</title>
        <meta name="description" content="Leaderboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-ifpink text-black" />

      <BackToTop />
      <main className="bg-ifpink flex-1 items-center flex flex-col">
        <div className="w-2/3">
          <PageBanner
            title="Testnet Leaderboard"
            text="Our incentivized testnet leaderboard shows you who the top point
          getters are for all-time score, miners, bug catchers, net promoters,
          node hosting, and more! Click someone’s user name to see a breakdown
          of their activity."
            buttonText="Sign Up"
            buttonClassName="mb-16"
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
                {$view && $view.value && (
                  <Select {...$view} className="text-lg" />
                )}
              </label>
            </div>
          </div>
          <div className="font-extended flex px-10 mb-4">
            {$users.length > 0 && (
              <>
                <div className="w-24">RANK</div>
                <div className="flex-1">USERNAME</div>
                {$view && $view.value && (
                  <div className="uppercase">
                    {$view.value.replace(/_/g, ' ')}
                  </div>
                )}
              </>
            )}
          </div>
          {$users.length > 0 ? (
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
