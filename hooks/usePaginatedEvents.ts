import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import * as API from 'apiClient'

export function usePaginatedEvents(
  userId: string,
  limit: number,
  events: API.ListEventsResponse | undefined,
  setEvents: Dispatch<SetStateAction<API.ListEventsResponse | undefined>>
): {
  $hasPrevious: boolean
  $hasNext: boolean
  fetchPrevious: () => void
  fetchNext: () => void
} {
  const $hasPrevious = useMemo(
    () => events?.metadata?.has_previous ?? false,
    [events]
  )
  const $hasNext = useMemo(() => events?.metadata?.has_next ?? false, [events])

  const fetchEvents = useCallback(
    async (id: number, direction: 'before' | 'after') => {
      const result = await API.listEvents({
        userId: userId,
        limit: limit,
        ...(direction === 'after' ? { after: id.toString() } : {}),
        ...(direction === 'before' ? { before: id.toString() } : {}),
      })

      if (!('error' in result)) {
        setEvents(result)
      }
    },
    [setEvents, userId, limit]
  )

  const fetchNext = useCallback(
    async () =>
      events && fetchEvents(events.data[events.data.length - 1].id, 'after'),
    [fetchEvents, events]
  )

  const fetchPrevious = useCallback(
    async () => events && fetchEvents(events.data[0].id, 'before'),
    [fetchEvents, events]
  )

  return { $hasPrevious, $hasNext, fetchPrevious, fetchNext }
}

export default usePaginatedEvents
