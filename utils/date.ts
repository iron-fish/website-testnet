import { isBefore, isAfter, eachWeekOfInterval, addMinutes } from 'date-fns'
import { toDate, format, utcToZonedTime } from 'date-fns-tz'

import { ApiEvent } from 'apiClient'

// modified version of https://github.com/date-fns/date-fns/issues/1401#issuecomment-621897094
export const makeRelativeConverter = () => {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  if (offset === 0) return (x: Date) => x
  return (x: Date) => addMinutes(x, -1 * x.getTimezoneOffset())
}

export const weeksBetween = (start: Date, end: Date) => {
  const raw = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 })
  const convert = makeRelativeConverter()
  return raw.map(convert)
}

export const withinBounds =
  (log: boolean) => (start: Date, end: Date) => (e: ApiEvent) => {
    const time = toDate(e.occurred_at)
    const match = isAfter(time, start) && isBefore(time, end)
    if (e.id === 101983) {
      console.log('hey', e.id, e.occurred_at, '---', time, '=>', start, end)
    }
    return match
  }

export const eventsBetween = (
  start: Date,
  end: Date,
  events: ApiEvent[]
): ApiEvent[] => events.filter(withinBounds(false)(start, end))

export const formatInTimeZone =
  (timeZone: string) => (date: Date, formatString: string) =>
    format(utcToZonedTime(date, timeZone), formatString, { timeZone })
export const formatUTC = formatInTimeZone('UTC')
export const formatEventDate = (d: Date) =>
  formatUTC(d, `y'-'MM'-'dd HH':'mm':'ss`)
