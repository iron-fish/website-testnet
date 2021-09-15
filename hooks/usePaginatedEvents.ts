import { useCallback, useState } from 'react'
import * as API from 'apiClient'

export function usePaginatedEvents(
  userId: string,
  limit: number,
  initialValue: API.ListEventsResponse
): {
  $events: ReadonlyArray<API.ApiEvent>
  $hasPrevious: boolean
  $hasNext: boolean
  fetchPrevious: () => void
  fetchNext: () => void
} {
  const [$events, $setEvents] = useState(initialValue.data)
  const [$hasPrevious, $setHasPrevious] = useState(
    initialValue.metadata.has_previous
  )
  const [$hasNext, $setHasNext] = useState(initialValue.metadata.has_next)

  const fetchEvents = useCallback(
    async (id: number, direction: 'before' | 'after') => {
      const result = await API.listEvents({
        userId: userId,
        limit: limit,
        ...(direction === 'after' ? { after: id.toString() } : {}),
        ...(direction === 'before' ? { before: id.toString() } : {}),
      })

      if (!('error' in result)) {
        $setHasPrevious(result.metadata.has_previous)
        $setHasNext(result.metadata.has_next)
        $setEvents(result.data)
      }
    },
    [userId, limit]
  )

  const fetchNext = useCallback(
    async () => fetchEvents($events[$events.length - 1].id, 'after'),
    [fetchEvents, $events]
  )

  const fetchPrevious = useCallback(
    async () => fetchEvents($events[0].id, 'before'),
    [fetchEvents, $events]
  )

  return { $events, $hasPrevious, $hasNext, fetchPrevious, fetchNext }
}

export default usePaginatedEvents
