import { Fragment, ReactElement, useState } from 'react'
import clsx from 'clsx'
import useClipboard from 'react-use-clipboard'

import ActivityBlockMined from 'components/icons/ActivityBlockMined'
import ActivityBugReported from 'components/icons/ActivityBugReport'
import ActivityPullRequest from 'components/icons/ActivityPullRequest'
import ActivityCopy from 'components/icons/ActivityCopy'
import ActivityCommunityContribution from 'components/icons/ActivityCommunityContribution'
import ActivitySocial from 'components/icons/ActivitySocial'
import ChevronRight from 'components/icons/ChevronRight'

import {
  EventType,
  ApiEvent,
  ApiEventMetadata,
  ApiEventMetadataBlockMined,
  ApiEventMetadataWithLink,
} from 'apiClient'

import { weeksBetween, eventsBetween, formatEventDate } from 'utils/date'

import styles from './EventRow.module.css'

interface IconText {
  icon: ReactElement | string
  text: string
}
const NEEDS_ICON = '🤨'
export function displayEventType(type: EventType): IconText {
  const text =
    type === 'BLOCK_MINED'
      ? 'Mined a block'
      : type === 'BUG_CAUGHT'
      ? 'Reported a bug'
      : type === 'COMMUNITY_CONTRIBUTION'
      ? 'Contributed to the community'
      : type === 'PULL_REQUEST_MERGED'
      ? 'Submitted a Pull Request'
      : type === 'SOCIAL_MEDIA_PROMOTION'
      ? 'Promoted testnet'
      : type
  const icon =
    type === 'BLOCK_MINED' ? (
      <ActivityBlockMined />
    ) : type === 'BUG_CAUGHT' ? (
      <ActivityBugReported />
    ) : type === 'COMMUNITY_CONTRIBUTION' ? (
      <ActivityCommunityContribution />
    ) : type === 'PULL_REQUEST_MERGED' ? (
      <ActivityPullRequest />
    ) : type === 'SOCIAL_MEDIA_PROMOTION' ? (
      <ActivitySocial />
    ) : (
      NEEDS_ICON
    )
  return { icon, text }
}
export type EventRowProps = {
  id: number
  type: EventType
  occurred_at: string
  points: number
  metadata?: ApiEventMetadata
}

const makeLinkForEvent = (type: EventType, metadata?: ApiEventMetadata) => {
  if (!metadata) return ''
  if ('hash' in metadata && type === EventType.BLOCK_MINED) {
    return `https://explorer.ironfish.network/blocks/${metadata.hash}`
  }
  return (metadata as ApiEventMetadataWithLink).url
}

type CopyableHashProps = {
  hash: string
}

enum CopyState {
  IDLE = 'copy_idle',
  OVER = 'copy_over',
  COPIED = 'copy_copied',
  RESETTING = 'copy_resetting',
}

const CopyableHash = ({ hash }: CopyableHashProps) => {
  const [, $setCopied] = useClipboard(hash, {
    successDuration: 1000,
  })
  const [$hover, $setHover] = useState<CopyState>(CopyState.IDLE)
  const abbrevHash = hash.slice(45)
  return (
    <div
      title={hash}
      onClick={e => {
        e.preventDefault()
        $setCopied()
        $setHover(CopyState.COPIED)
        setTimeout(() => $setHover(CopyState.RESETTING), 2e3)
      }}
      onMouseOver={() => {
        if ($hover === CopyState.COPIED) {
          return
        }
        $setHover(CopyState.OVER)
      }}
      onMouseOut={() => {
        if ($hover !== CopyState.COPIED && $hover !== CopyState.RESETTING) {
          $setHover(CopyState.IDLE)
        }
      }}
      className={clsx(
        'flex',
        'items-center',
        'justify-center',
        'relative',
        styles.copyable,
        $hover === CopyState.RESETTING
          ? styles.resetting
          : $hover === CopyState.COPIED
          ? styles.copied
          : $hover === CopyState.OVER
          ? styles.active
          : ''
      )}
    >
      <>
        Block &hellip; {abbrevHash}
        <ActivityCopy className="ml-4" />
      </>
    </div>
  )
}

const summarizeEvent = (
  type: EventType,
  metadata: ApiEventMetadata
): ReactElement => {
  if (type === EventType.BLOCK_MINED) {
    // return 'View in the explorer'
    const { hash } = metadata as ApiEventMetadataBlockMined
    return <CopyableHash hash={hash} />
  }
  const { url } = metadata as ApiEventMetadataWithLink
  const link = new URL(url)
  const { pathname, hostname } = link
  const parts = pathname.split('/')
  const id = parts.slice(-1)[0]
  if (type === EventType.PULL_REQUEST_MERGED) {
    // https://github.com/iron-fish/ironfish-api/pull/595
    return <>View pull request #{id}</>
  } else if (type === EventType.BUG_CAUGHT) {
    // https://github.com/iron-fish/ironfish/issues/930
    return <>View issue #{id}</>
  } else if (type === EventType.COMMUNITY_CONTRIBUTION) {
    return <>View contribution</>
  } else if (type === EventType.SOCIAL_MEDIA_PROMOTION) {
    return <>Promoted on {hostname}</>
  }
  return <>UNHANDLED: {type}</>
}

export const EventRow = ({
  type,
  occurred_at: occurredAt,
  points,
  metadata,
}: EventRowProps) => {
  const { text, icon } = displayEventType(type)

  const eType = (
    <div className="flex items-center justify-start">
      <span className="hidden md:flex mr-2">{icon}</span>
      {text}
    </div>
  )

  return (
    <tr className="border-b border-black">
      <td className="py-4 w-1/3">{eType}</td>
      <td>{formatEventDate(new Date(occurredAt))}</td>
      <td>{points}</td>
      <td className="max-w-[13rem]">
        <a
          href={makeLinkForEvent(type, metadata)}
          className="text-ifotherblue align-left flex items-end justify-between"
          target="_blank"
          rel="noreferrer"
        >
          <div className="hidden md:flex">
            {metadata && summarizeEvent(type, metadata)}
          </div>
          <div className="md:hidden">View</div>
          <ChevronRight />
        </a>
      </td>
    </tr>
  )
}

type WeekRowProps = {
  week: number
  start: Date
  end: Date
}

const WeekRow = ({ week, start, end }: WeekRowProps) => {
  const when = `Week ${week}: Started ${formatEventDate(
    start
  )} - Ended ${formatEventDate(end)}`
  return (
    <tr
      className="bg-black text-white"
      data-date={start}
      aria-label={when}
      title={when}
    >
      <td
        colSpan={4}
        className="text-center uppercase text-xs tracking-widest h-8"
      >
        Week {week}
      </td>
    </tr>
  )
}

const makeCounter = () => {
  let x = 0
  return () => x++
}

const sortEventsByDate = (xs: ApiEvent[]) =>
  xs.sort((a: ApiEvent, b: ApiEvent): number =>
    a.occurred_at > b.occurred_at ? -1 : 1
  )

type WeeklyData = {
  week: number
  date: Date
  prior: Date
  events: ApiEvent[]
}

export const renderEvents = (
  start: Date,
  end: Date,
  rawEvents: readonly ApiEvent[]
) => {
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
    .map(
      ({ date, week, events, prior }: WeeklyData) =>
        events.length > 0 && (
          <Fragment key={date.toTimeString() + week}>
            <WeekRow week={week} start={prior || date} end={date} />
            {events.map((e: ApiEvent) => (
              <EventRow {...e} key={e.id} />
            ))}
          </Fragment>
        )
    )
}
export default renderEvents
