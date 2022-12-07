import type { ReactNode } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Box } from 'components/OffsetBorder/Box'
import { RawButton } from 'components/Button'
import Chip from 'components/Chip'

import { Status } from './types'

type CTAProps = {
  title: string
  content?: ReactNode
  children?: ReactNode
  behind?: string
  kind?: string
  earn?: number
  points?: string[]
  ctaText?: string
  href?: string
  status?: Status
  submissionForm?: boolean
  disabled?: boolean
}

export const CallToAction = ({
  children,
  behind,
  title,
  points = [],
  kind = 'Earn Points By',
  earn = 0,
  href,
  ctaText,
  status = Status.Active,
  disabled = false,
  submissionForm = false,
}: CTAProps) => {
  const comingSoon = status === Status.ComingSoon
  const ended = status === Status.Ended
  const isNew = status === Status.New
  const button = ctaText ? (
    <RawButton
      border="border"
      className={clsx(
        'm-auto',
        'w-full',
        'max-w-md',
        'mb-2',
        'mt-6',
        'text-md',
        'p-2'
      )}
      colorClassName={clsx(
        'text-black',
        'bg-transparent',
        'hover:bg-black',
        'hover:text-white'
      )}
    >
      {href ? <Link href={href}>{ctaText}</Link> : ctaText}
    </RawButton>
  ) : null
  return (
    <div className="mb-3">
      <Box behind={behind || 'bg-ifpink'}>
        <div className="p-13">
          {isNew && <Chip behind={behind} />}
          {ended || comingSoon ? (
            <div
              className={clsx(
                'bg-iflightgray',
                'text-ifgray',
                'px-4',
                'py-2',
                'inline-block',
                'mt-2',
                'text-xs',
                'md:text-md',
                'mb-2'
              )}
            >
              {comingSoon ? 'Coming soon!' : 'Phase 1 Ended'}
            </div>
          ) : (
            <strong className={clsx('uppercase', 'text-lg')}>{kind}</strong>
          )}
          <h3
            className={clsx(
              'text-left',
              'text-4xl',
              'mt-3',
              'mb-4',
              'font-extended'
            )}
          >
            {title}
          </h3>
          {children}
          {points && points.length > 0 && (
            <ul className={clsx('pl-3', 'ml-3')}>
              {points.map((p: string) => (
                <li className={clsx('list-disc', 'my-3')} key={p}>
                  {p}
                </li>
              ))}
            </ul>
          )}
          {earn > 0 && !comingSoon && !ended && (
            <div
              className={clsx(
                'bg-ifpink',
                'px-4',
                'py-2',
                'inline-block',
                'mt-2',
                'text-xs',
                'md:text-md'
              )}
            >
              Earn up to {earn.toLocaleString('en-US')} points a week
            </div>
          )}
          {disabled ? null : !ended && ctaText && href && button ? (
            <Link href={href}>{button}</Link>
          ) : (
            button
          )}
          {!disabled && !ended && submissionForm && (
            <Link href="https://forms.gle/yrAtzoyKTwLgLTRZA" passHref>
              <RawButton
                border="border"
                className={clsx(
                  'm-auto',
                  'w-full',
                  'mt-2',
                  'max-w-md',
                  'mb-2',
                  'text-md',
                  'p-2'
                )}
                colorClassName={clsx(
                  'text-black',
                  'bg-transparent',
                  'hover:bg-black',
                  'hover:text-white'
                )}
              >
                Claim Points
              </RawButton>
            </Link>
          )}
        </div>
      </Box>
    </div>
  )
}

export const renderColumn = ({ title, content, ...ctaProps }: CTAProps) => (
  <CallToAction title={title} key={title} {...ctaProps}>
    <div>{content}</div>
  </CallToAction>
)

export default CallToAction
