import { isBefore, isAfter, eachWeekOfInterval } from 'date-fns'
import { toDate, format, utcToZonedTime } from 'date-fns-tz'

import { ApiEvent } from 'apiClient'

export const weeksBetween = (start: Date, end: Date) =>
  eachWeekOfInterval({ start, end }, { weekStartsOn: 1 })

export const eventsBetween = (
  start: Date,
  end: Date,
  events: ApiEvent[]
): ApiEvent[] =>
  events.filter(e => {
    const time = toDate(e.occurred_at)
    return isAfter(time, start) && isBefore(time, end)
  })

export const formatInTimeZone =
  (timeZone: string) => (date: Date, formatString: string) =>
    format(utcToZonedTime(date, timeZone), formatString, { timeZone })
export const formatUTC = formatInTimeZone('UTC')
export const formatEventDate = (d: Date) =>
  formatUTC(d, `y'-'MM'-'dd HH':'mm':'ss`)
