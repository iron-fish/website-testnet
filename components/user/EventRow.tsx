// import { ReactType } from 'react'
import addWeeks from 'date-fns/addWeeks'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'
import parseISO from 'date-fns/parseISO'
import isDate from 'date-fns/isDate'

import * as API from 'apiClient/index'

export function displayEventType(type: API.EventType): string {
  switch (type) {
    case 'BLOCK_MINED':
      return 'Mined a block'
    case 'BUG_CAUGHT':
      return 'Reported a bug'
    case 'COMMUNITY_CONTRIBUTION':
      return 'Contributed to the community'
    case 'PULL_REQUEST_MERGED':
      return 'Merged a pull request'
    case 'SOCIAL_MEDIA_PROMOTION':
      return 'Promoted testnet'
    default:
      return type
  }
}
export type EventRowProps = {
  id: number
  type: API.EventType
  occurred_at: string
  points: number
  metadata?: API.ApiEventMetadata
}

const makeLinkForEvent = (
  type: API.EventType,
  metadata?: API.ApiEventMetadata
) => {
  if (metadata && metadata.hash && type === API.EventType.BLOCK_MINED) {
    return `https://explorer.ironfish.network/blocks/${metadata.hash}`
  }
}

const summarizeEvent = (
  type: API.EventType
  // metadata?: API.ApiEventMetadata
) => {
  if (type === API.EventType.BLOCK_MINED) {
    return 'View in the explorer'
    // return '...' + metadata.hash.slice(metadata.hash.length / 2, Infinity)
  } else if (type === API.EventType.PULL_REQUEST_MERGED) {
    return 'View pull request'
  }
}

export const EventRow = ({
  id,
  type,
  occurred_at: occurredAt,
  points,
  metadata,
}: EventRowProps) => {
  return (
    <tr key={id} className="border-b border-black">
      <td className="py-4">{displayEventType(type)}</td>
      <td>{new Date(occurredAt).toLocaleString()}</td>
      <td>{points}</td>
      <td>
        <a
          href={makeLinkForEvent(type, metadata)}
          className="text-ifblue border-b-ifblue"
        >
          {summarizeEvent(type)}
        </a>
      </td>
    </tr>
  )
}

type WeekRowProps = {
  date: Date
  index: number
}

const WeekRow = ({ date, index }: WeekRowProps) => (
  <tr className="bg-black text-white" data-date={date}>
    <td
      colSpan={4}
      className="text-center uppercase text-xs tracking-widest h-8"
    >
      Week {index}
    </td>
  </tr>
)

const weeksSince = (x: Date) => {
  const weeks = []
  // Date is stupid af -- let's make things 0 indexed most of the time, but not all the time
  let current = new Date(x.getFullYear(), 0, 1, 0, 0, 0)
  while (isBefore(current, x)) {
    // eslint-disable-next-line no-console
    console.log({ current })
    weeks.push(current)
    current = addWeeks(current, 1)
  }
  return weeks
}

const eventsWithin = (
  a: Date,
  b: Date,
  events: API.ApiEvent[]
): API.ApiEvent[] =>
  events.filter(e => {
    const d = parseISO(e.occurred_at)
    return isBefore(d, a) && isAfter(d, b)
  })

const eventsBefore = (a: Date, events: API.ApiEvent[]): API.ApiEvent[] =>
  events.filter(e => isBefore(parseISO(e.occurred_at), a))

const makeCounter = (total: number) => {
  let x = -1
  return () => {
    x++
    return total - x
  }
}

type DatedIndex = {
  date: Date
  index: number
}

const sortByDate = (xs: API.ApiEvent[]) =>
  xs.sort((a: API.ApiEvent, b: API.ApiEvent): number =>
    a.occurred_at > b.occurred_at ? 1 : -1
  )

type EventContainer = {
  events: API.ApiEvent[]
}

export const renderEvents = (events: API.ApiEvent[]) => {
  const weeksThisYear = weeksSince(new Date()).reverse()
  const counter = makeCounter(weeksThisYear.length)
  // this logic is all fucked up, deal with it tomorrow
  return (
    weeksThisYear
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((agg: any, week: Date) => {
        const prev = agg[agg.length - 1]
        // eslint-disable-next-line no-console
        console.log({ prev, week })
        const raw = isDate(prev)
          ? eventsWithin(week, prev, events)
          : eventsBefore(weeksThisYear[1], events)
        const ev = sortByDate(raw)
        return [...agg, { events: ev }, { date: week, index: counter() }]
      }, [])
      .reverse()
      .map((x: DatedIndex | EventContainer, ix: number) => {
        if ('date' in x) {
          return <WeekRow key={'' + x.date} {...x} />
        }
        if ('events' in x && x.events.length) {
          return (
            <>
              {x.events.map((e: API.ApiEvent) => (
                <EventRow {...e} key={e.id} />
              ))}
            </>
          )
        }
        return (
          <tr className="block py-2" key={'' + ix}>
            <td colSpan={4}>No activity for this week</td>
          </tr>
        )
      })
  )
}
export default renderEvents
