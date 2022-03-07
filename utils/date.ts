import { set, nextMonday, eachWeekOfInterval, addMinutes } from 'date-fns'
import { format, utcToZonedTime } from 'date-fns-tz'

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

export const formatInTimeZone =
  (timeZone: string) => (date: Date, formatString: string) =>
    format(utcToZonedTime(date, timeZone), formatString, { timeZone })
export const formatUTC = formatInTimeZone('UTC')

export const nextMondayFrom = (when: Date) => {
  const convert = makeRelativeConverter()
  return convert(
    nextMonday(set(when, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }))
  )
}
