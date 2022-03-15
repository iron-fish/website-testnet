import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import * as API from 'apiClient'

type PaginatedUsers = {
  $hasPrevious: boolean
  $hasNext: boolean
  fetchPrevious: () => void
  fetchNext: () => void
}

export function usePaginatedUsers(
  limit: number,
  search: string,
  eventType: string,
  countryCode: string,
  users: API.PaginatedListLeaderboardResponse | undefined,
  setUsers: Dispatch<
    SetStateAction<API.PaginatedListLeaderboardResponse | undefined>
  >
): PaginatedUsers {
  const $hasPrevious = useMemo(
    () => users?.metadata.has_previous ?? false,
    [users]
  )
  const $hasNext = useMemo(() => users?.metadata.has_next ?? false, [users])

  const fetchUsers = useCallback(
    async (id: number, direction: 'before' | 'after') => {
      const raw = { [direction]: id.toString() }

      const countrySearch =
        countryCode !== 'Global' ? { country_code: countryCode } : {}

      const eventTypeData =
        eventType !== 'Total Points' ? { event_type: eventType } : {}

      const result = await API.listUsers({
        limit,
        ...raw,
        ...countrySearch,
        ...eventTypeData,
      })

      if (!('error' in result)) {
        setUsers(result)
      }
    },
    [setUsers, limit, countryCode, eventType]
  )

  const fetchNext = useCallback(
    async () =>
      users && fetchUsers(users.data[users.data.length - 1].id, 'after'),
    [fetchUsers, users]
  )

  const fetchPrevious = useCallback(
    async () => users && fetchUsers(users.data[0].id, 'before'),
    [fetchUsers, users]
  )

  return { $hasPrevious, $hasNext, fetchPrevious, fetchNext }
}

export default usePaginatedUsers
