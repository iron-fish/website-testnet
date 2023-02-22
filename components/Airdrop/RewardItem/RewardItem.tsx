import clsx from 'clsx'
import { Box } from 'components/OffsetBorder/Box'
import { ReactNode } from 'react'

type Props = {
  points: number
  iron: number | null
  chips: ReactNode
  phase: 0 | 1 | 2 | 3
}

const titlesByPhase = {
  0: 'Open Source Points',
  1: 'Phase 1 Points',
  2: 'Phase 2 Points',
  3: 'Phase 3 Points',
}

export function RewardItem({ phase, points, iron, chips }: Props) {
  return (
    <div className="mb-3">
      <Box behind={'transaprent'}>
        <div className={clsx('flex', 'p-8')}>
          <div className="mr-8">
            <div className={clsx('relative')}>
              <div
                aria-hidden
                className={clsx(
                  'text-lg',
                  'text-transparent',
                  'whitespace-nowrap'
                )}
              >
                Open Source Points
              </div>
              <div
                className={clsx(
                  'text-lg',
                  'absolute',
                  'inset-0',
                  'whitespace-nowrap'
                )}
              >
                {titlesByPhase[phase]}
              </div>
            </div>
            <div className={clsx('flex', 'items-center', 'justify-between')}>
              <h3
                className={clsx(
                  'text-left',
                  'text-3xl',
                  'mt-3',
                  'font-extended'
                )}
              >
                {points !== null ? points.toLocaleString('en-US') : 'n/a'}
              </h3>
              <span className="mt-2">=</span>
            </div>
          </div>
          <div>
            <span className={clsx('text-lg')}>Open Source Reward in $IRON</span>
            <h3
              className={clsx('text-left', 'text-3xl', 'mt-3', 'font-extended')}
            >
              {iron !== null ? iron.toLocaleString('en-US') : 'TBD'}
            </h3>
          </div>
          <div className={clsx('flex', 'flex-col', 'gap-y-2', 'ml-auto')}>
            {chips}
          </div>
        </div>
      </Box>
    </div>
  )
}
