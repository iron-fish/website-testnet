import clsx from 'clsx'
import { Box } from 'components/OffsetBorder/Box'
import { ReactNode } from 'react'

type Props = {
  points: number
  iron: number | null
  chips: ReactNode
}

export function RewardItem({ points, iron, chips }: Props) {
  return (
    <div className="mb-3">
      <Box behind={'transaprent'}>
        <div className={clsx('flex', 'p-8')}>
          <div className="mr-8">
            <span className={clsx('text-lg')}>Open Source Points</span>
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
