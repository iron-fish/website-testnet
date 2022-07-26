import React from 'react'
import CSS from 'csstype'
import { ReactType } from 'react'
import clsx from 'clsx'

import { RawFishAvatar } from 'components/user/FishAvatar'
import { graffitiToColor, numberToOrdinal } from 'utils'
import { SmallOnly } from 'components/Responsive'

type Props = {
  rank: number
  graffiti: string
  points: number
}

type LabeledTextProps = {
  label: string
  children: ReactType | string
  style?: CSS.Properties
  childClassName?: string
}

const LabeledText = ({
  style = {},
  childClassName = '',
  label,
  children,
}: LabeledTextProps) => (
  <div
    style={style}
    className={clsx('flex-col', 'flex', 'm-2', 'max-h-[3rem]', 'md:hidden')}
  >
    <SmallOnly
      className={clsx(
        'font-extended',
        'uppercase',
        'text-ifsubtextgray',
        'text-xs'
      )}
    >
      {label}
    </SmallOnly>
    <div
      className={clsx('truncate', 'text-lg', 'font-extended', childClassName)}
    >
      {children}
    </div>
  </div>
)

function LeaderboardRow({ rank, graffiti, points = 0 }: Props) {
  const avatarColor = graffitiToColor(graffiti)
  const rankStr = numberToOrdinal(rank)
  const pointsStr = points.toLocaleString()

  return (
    <div
      className={clsx(
        'font-favorit',
        'relative',
        'bg-white',
        'flex',
        'flex-wrap',
        'md:rounded',
        'px-2',
        'py-2',
        'sm:px-10',
        'w-full',
        'min-w-[8rem]',
        'min-h-[9rem]',
        'md:min-h-[3rem]',
        'border',
        'border-black',
        'md:items-center'
      )}
      style={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.19)' }}
    >
      {/* Mobile */}
      <LabeledText
        style={{ minWidth: 'calc(100% - 5.125rem)' }}
        label="USERNAME"
      >
        {graffiti}
      </LabeledText>
      <RawFishAvatar
        color={avatarColor}
        classes={[
          'max-w-[3.125rem]',
          'max-h-[3.125rem]',
          'flex',
          'bg-transparent',
          'border',
          'border-black',
          'min-w-[3.125rem]',
          'm-2',
          'flex-none',
          'md:hidden',
        ]}
      />
      <div className={clsx('flex', 'justify-between', 'w-full', 'md:hidden')}>
        <LabeledText label="RANK">{rankStr}</LabeledText>
        <LabeledText label="TOTAL POINTS" childClassName="text-right">
          {pointsStr}
        </LabeledText>
      </div>
      {/* elements for non-mobile */}
      <div
        className={clsx(
          'hidden',
          'md:inline',
          'font-extended',
          'text-2xl',
          'w-16',
          'sm:w-24',
          'truncate'
        )}
      >
        {rankStr}
      </div>

      <div
        className={clsx(
          'flex',
          'flex-1',
          'items-center',
          'font-extended',
          'text-2xl',
          'overflow-hidden'
        )}
      >
        <div className={clsx('py-3', 'mr-5', 'hidden', 'md:inline')}>
          <RawFishAvatar
            color={avatarColor}
            classes={[
              'max-w-[3.125rem]',
              'flex',
              'bg-transparent',
              'border',
              'border-black',
              'md:min-w-[3.125rem]',
              'md:max-w-[3.125rem]',
              'md:max-h-[3.125rem]',
            ]}
          />
        </div>
        <div className={clsx('hidden', 'md:inline', 'truncate')}>
          {graffiti}
        </div>
      </div>
      <div
        className={clsx(
          'hidden',
          'md:inline',
          'font-extended',
          'text-2xl',
          'ml-2'
        )}
      >
        {pointsStr}
      </div>
    </div>
  )
}

export default LeaderboardRow
