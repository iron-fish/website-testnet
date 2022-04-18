import { useState } from 'react'

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
  info?: string
  verticalOffset?: string
  useRank?: boolean
}

export function GenericMetricCard(props: GenericMetricCardProps) {
  const {
    title,
    metric,
    top,
    bottom,
    useRank = false,
    bottomUnit = 'points',
    showInfo = false,
    info,
    verticalOffset = '',
  } = props
  // eslint-disable-next-line no-console
  console.log({ metric, props })
  const [$over, $setOver] = useState(false)
  const value = useRank
    ? (metric.rank || 0).toLocaleString()
    : (metric.count || 0).toLocaleString()
  const bottomContent = bottom
    ? bottom
    : metric.points.toLocaleString() + ' ' + bottomUnit
  const styleData = verticalOffset ? (
    <style>{`
  .customOffset::before {
    margin-top: ${verticalOffset}
  }
`}</style>
  ) : null
  return (
    <>
      {styleData}
      <OffsetBorderBox className={clsx('w-full', styles.metricCard)}>
        <div className={clsx('font-extended', 'p-8', 'md:p-6')}>
          <div
            className={clsx(
              'text-md',
              'md:text-lg',
              'mb-4',
              'whitespace-nowrap'
            )}
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
                onMouseOver={() => $setOver(true)}
                onMouseOut={() => $setOver(false)}
                className={clsx(
                  'absolute',
                  'top-2',
                  'right-2',
                  verticalOffset ? 'customOffset' : '',
                  styles.copyable,
                  $over ? styles.active : ''
                )}
                data-info={info}
              >
                <Info />
              </div>
            )}
          </div>
        </div>
      </OffsetBorderBox>
    </>
  )
}

export default GenericMetricCard
