import { PoolNames } from 'apiClient'
import clsx from 'clsx'
import { Box } from 'components/OffsetBorder/Box'
import { ReactNode } from 'react'

type Props = {
  points: string | number
  iron: number | null
  chips: ReactNode
  poolName: PoolNames
}

export const titlesByPhase: Record<PoolNames, string> = {
  pool_three: 'Pull Request Points',
  pool_one: 'Phase 1 Points',
  pool_two: 'Phase 2 Points',
  pool_four: 'Phase 3 Points',
}

const longestPoolName = Object.values(titlesByPhase).sort(
  (a, b) => b.length - a.length
)[0]

export function RewardItem({ poolName, points, iron, chips }: Props) {
  return (
    <div className="mb-3">
      <Box behind={'transaprent'}>
        <div
          className={clsx(
            'md:p-8',
            'md:flex-row',
            'md:gap-0',
            'gap-10',
            'flex-col',
            'flex',
            'p-4'
          )}
        >
          <div className="mr-8">
            <div className={clsx('relative')}>
              <div
                aria-hidden
                className={clsx(
                  'text-lg',
                  'text-transparent',
                  'whitespace-nowrap',
                  'select-none'
                )}
              >
                {longestPoolName}
              </div>
              <div
                className={clsx(
                  'text-lg',
                  'absolute',
                  'inset-0',
                  'whitespace-nowrap'
                )}
              >
                {titlesByPhase[poolName]}
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
              <span className={clsx('hidden', 'md:block', 'mt-2')}>=</span>
            </div>
          </div>
          <div>
            <span className={clsx('text-lg')}>Reward in $IRON</span>
            <h3
              className={clsx('text-left', 'text-3xl', 'mt-3', 'font-extended')}
            >
              {iron !== null ? iron.toLocaleString('en-US') : 'TBD'}
            </h3>
          </div>
          <div className={clsx('flex', 'flex-col', 'gap-y-2', 'md:ml-auto')}>
            {chips}
          </div>
        </div>
      </Box>
    </div>
  )
}
