import * as API from 'apiClient'
import styles from './GenericMetricCard.module.css'
import { Box as OffsetBorderBox } from 'components/OffsetBorder'
import Info from 'components/icons/Info'
import clsx from 'clsx'

type GenericMetricCardProps = {
  metric: API.UserMetric
  title: string
  top?: string
  bottom?: string
  bottomUnit?: string
  showInfo?: boolean
  info: string
}

export function GenericMetricCard({
  title,
  metric,
  top,
  bottom,
  bottomUnit,
  showInfo = false,
  info,
}: GenericMetricCardProps) {
  const value = metric.count.toLocaleString()
  const bottomContent = bottom
    ? bottom
    : metric.points.toLocaleString() + ' ' + bottomUnit
  return (
    <OffsetBorderBox className={clsx('w-full', styles.metricCard)}>
      <div className={clsx('font-extended', 'p-8', 'md:p-6')}>
        <div
          className={clsx('text-md', 'md:text-lg', 'mb-4', 'whitespace-nowrap')}
        >
          {title}
        </div>
        <div className={clsx('flex', 'gap-4')}>
          <div className="text-5xl">{value}</div>
          <div className={clsx('font-favorit', 'mt-1', 'overflow-hidden')}>
            <div className="leading-tight">{top}</div>
            <div
              className={clsx(
                'text-ifsubtextgray',
                'leading-tight',
                'truncate'
              )}
            >
              {bottomContent}
            </div>
          </div>
          {showInfo && (
            <div
              className={clsx(
                'absolute',
                'top-2',
                'right-2',
                styles.copyable,
                styles.active
              )}
              data-info={info}
            >
              <Info />
            </div>
          )}
        </div>
      </div>
    </OffsetBorderBox>
  )
}

export default GenericMetricCard
