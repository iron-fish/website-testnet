import { Box as OffsetBorderBox } from 'components/OffsetBorder'
import clsx from 'clsx'

type MetricCardProp = {
  title: string
  value: string
  subValueTop: string
  subValueBottom: string
}

export default function MetricCard({
  title,
  value,
  subValueTop,
  subValueBottom,
}: MetricCardProp) {
  return (
    <OffsetBorderBox className={clsx('w-full', 'md:max-w-[18rem]')}>
      <div className={clsx('font-extended', 'p-8')}>
        <div
          className={clsx('text-md', 'md:text-lg', 'mb-4', 'whitespace-nowrap')}
        >
          {title}
        </div>
        <div className={clsx('flex', 'gap-4')}>
          <div className="text-5xl">{value}</div>
          <div className={clsx('font-favorit', 'mt-1', 'overflow-hidden')}>
            <div className="leading-tight">{subValueTop}</div>
            <div
              className={clsx(
                'text-ifsubtextgray',
                'leading-tight',
                'truncate'
              )}
            >
              {subValueBottom}
            </div>
          </div>
        </div>
      </div>
    </OffsetBorderBox>
  )
}
