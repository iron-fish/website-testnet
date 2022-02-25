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
import { Verbose, SmallOnly } from 'components/Responsive'

import {
  EventType,
  ApiEvent,
  ApiEventMetadata,
  ApiEventMetadataBlockMined,
  ApiEventMetadataWithLink,
} from 'apiClient'

import {
  formatEventDate,
  bucketEventsAndAccountForMissingOnes,
  WeeklyData,
} from 'utils/events'

import styles from './EventRow.module.css'

interface IconText {
  icon: ReactElement | string
  text: ReactElement | string
}
const NEEDS_ICON = '🤨'
export function displayEventType(type: EventType): IconText {
  const text = (
    <div>
      {type === 'BLOCK_MINED' ? (
        <>Mined a block</>
      ) : type === 'BUG_CAUGHT' ? (
        <>Reported a bug</>
      ) : type === 'COMMUNITY_CONTRIBUTION' ? (
        <>
          <SmallOnly>Community contribution</SmallOnly>
          <Verbose>Contributed to the community</Verbose>
        </>
      ) : type === 'PULL_REQUEST_MERGED' ? (
        <>
          Submitted a <SmallOnly>PR</SmallOnly>
          <Verbose>Pull Request</Verbose>
        </>
      ) : type === 'SOCIAL_MEDIA_PROMOTION' ? (
        <>Promoted testnet</>
      ) : (
        type
      )}
    </div>
  )
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
  const abbrevHash = hash.slice(50)
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
        <Verbose defaultClassName="md:flex" className="items-center">
          Block &hellip; {abbrevHash}
          <ActivityCopy className="ml-4" />
        </Verbose>
        <SmallOnly>View</SmallOnly>
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
    return (
      <>
        View<Verbose className="ml-1">pull request #{id}</Verbose>
      </>
    )
  } else if (type === EventType.BUG_CAUGHT) {
    // https://github.com/iron-fish/ironfish/issues/930
    return (
      <>
        View<Verbose className="ml-1">issue #{id}</Verbose>
      </>
    )
  } else if (type === EventType.COMMUNITY_CONTRIBUTION) {
    return (
      <>
        View<Verbose className="ml-1">contribution</Verbose>
      </>
    )
  } else if (type === EventType.SOCIAL_MEDIA_PROMOTION) {
    return (
      <>
        <SmallOnly>View</SmallOnly>
        <Verbose>Promoted on {hostname}</Verbose>
      </>
    )
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
    <div className={clsx('flex', 'items-center', 'justify-start')}>
      <Verbose className="mr-2">{icon}</Verbose>
      <div className={clsx('text-xs', 'md:text-sm')}>{text}</div>
    </div>
  )
  const formattedDate = formatEventDate(new Date(occurredAt))
  return (
    <tr className={clsx('border-b', 'border-black')}>
      <td
        className={clsx(
          'py-4',
          'w-1/2',
          'min-w-[8rem]',
          'pr-2',
          'md:pr-0',
          'md:w-1/3',
          'md:min-w-[0]'
        )}
      >
        {eType}
        <SmallOnly className="text-xs">{formattedDate}</SmallOnly>
      </td>
      <td className={clsx('hidden', 'md:table-cell')}>{formattedDate}</td>
      <td>{points}</td>
      <td className={clsx('max-w-[3rem]', 'md:max-w-[11rem]')}>
        <a
          href={makeLinkForEvent(type, metadata)}
          className={clsx(
            'text-ifotherblue',
            'align-left',
            'flex',
            'items-end',
            'justify-end'
          )}
          target="_blank"
          rel="noreferrer"
        >
          <>
            {metadata && summarizeEvent(type, metadata)}
            <ChevronRight />
          </>
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
  const regular = week > 0
  const when = regular
    ? `Week ${week}: Started ${formatEventDate(
        start
      )} - Ended ${formatEventDate(end)}`
    : `Events from before the testnet started`
  const headerText = regular ? `Week ${week}` : `Pre-Testnet`
  return (
    <tr
      className={clsx('bg-black', 'text-white')}
      data-date={start}
      aria-label={when}
      title={when}
    >
      <td
        colSpan={4}
        className={clsx(
          'text-center',
          'uppercase',
          'text-xs',
          'tracking-widest',
          'h-8'
        )}
      >
        {headerText}
      </td>
    </tr>
  )
}

export const renderEvents = (
  start: Date,
  end: Date,
  rawEvents: readonly ApiEvent[]
) => {
  return bucketEventsAndAccountForMissingOnes(start, end, rawEvents).map(
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
