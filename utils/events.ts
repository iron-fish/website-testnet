import { isBefore, isAfter } from 'date-fns'
import { toDate } from 'date-fns-tz'
import { formatUTC, weeksBetween } from './date'
import { ApiEvent } from 'apiClient'

export type WeeklyData = {
  week: number
  date: Date
  prior: Date
  events: ApiEvent[]
}

export const withinBounds = (start: Date, end: Date) => (e: ApiEvent) => {
  const time = toDate(e.occurred_at)
  return isAfter(time, start) && isBefore(time, end)
}
export const eventsBetween = (
  start: Date,
  end: Date,
  events: ApiEvent[]
): ApiEvent[] => events.filter(withinBounds(start, end))

export function uniqueById(x: readonly ApiEvent[]) {
  return x.reduce((agg: ApiEvent[], i: ApiEvent) => {
    if (!agg.map(({ id }) => id).includes(i.id)) {
      return agg.concat(i)
    }
    return agg
  }, [])
}

export const getAllVisibleEvents = (weeklyData: WeeklyData[]) =>
  weeklyData.reduce((agg: ApiEvent[], { events }) => {
    return agg.concat(events)
  }, [])

export const findMissingEvents = (
  allEvents: readonly ApiEvent[],
  weeklyData: WeeklyData[]
) =>
  allEvents.reduce((agg: ApiEvent[], x: ApiEvent) => {
    const onlyMatched = getAllVisibleEvents(weeklyData)
    if (onlyMatched.map(({ id }: { id: number }) => id).includes(x.id)) {
      return agg
    }
    return agg.concat(x)
  }, [])

/*
const retest = (allEvents: ApiEvent[], weeklyData: WeeklyData[]) =>
  weeklyData.reduce(
    (agg: ApiEvent[], { prior: a, date: z }: { prior: Date; date: Date }) => {
      const missing = findMissingEvents(allEvents, weeklyData)
      return agg.concat(
        missing.filter((ev: ApiEvent) => withinBounds(a, z)(ev))
      )
    },
    []
  )
*/
const sortEventsByDate = (xs: ApiEvent[]) =>
  xs.sort((a: ApiEvent, b: ApiEvent): number =>
    a.occurred_at > b.occurred_at ? -1 : 1
  )
const makeCounter = () => {
  let x = 0
  return () => x++
}
export const bucketEvents = (
  start: Date,
  end: Date,
  rawEvents: readonly ApiEvent[]
): WeeklyData[] => {
  const weeks = weeksBetween(start, end)
  const counter = makeCounter()
  return weeks
    .reduce((agg: WeeklyData[], date: Date) => {
      const prev = agg[agg.length - 1]
      const prior = prev ? prev.date : start
      const events = sortEventsByDate(
        eventsBetween(prior, date, rawEvents as ApiEvent[])
      )
      return agg.concat({
        prior,
        date,
        events,
        week: counter(),
      })
    }, [])
    .reverse()
}

export const bucketEventsAndAccountForMissingOnes = (
  start: Date,
  end: Date,
  rawEvents: readonly ApiEvent[]
) => {
  const weeklyData = bucketEvents(start, end, rawEvents)
  const missingEvents = findMissingEvents(rawEvents, weeklyData)
  const eventsPriorToStart = missingEvents.filter(({ occurred_at: time }) =>
    isBefore(start, toDate(time))
  )
  if (eventsPriorToStart.length > 0) {
    return weeklyData.concat({
      prior: new Date(2020, 1, 1),
      date: start,
      events: eventsPriorToStart,
      week: -1,
    })
  }
  return weeklyData
}

export const formatEventDate = (d: Date) =>
  formatUTC(d, `y'-'MM'-'dd HH':'mm':'ss`)
