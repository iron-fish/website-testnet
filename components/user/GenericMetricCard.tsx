import { useState } from 'react'

import * as API from 'apiClient'
import styles from './GenericMetricCard.module.css'
import { Box as OffsetBorderBox } from 'components/OffsetBorder'
import Info from 'components/icons/Info'
import clsx from 'clsx'
import { GenericCardProps } from './types'

interface GenericMetricCardProps extends GenericCardProps {
  metric: API.UserMetric
}

export function GenericMetricCard({
  title,
  top,
  bottom,
  useRank = false,
  bottomUnit = 'points',
  showInfo = false,
  info,
  verticalOffset = '',
  subline = <div className="mb-4" />,
  metric,
}: GenericMetricCardProps) {
  const [$over, $setOver] = useState(false)
  if (!metric) {
    return <>{title} - Data Missing</>
  }
  const value =
    metric && useRank
      ? (metric?.rank || 0).toLocaleString()
      : (metric?.count || 0).toLocaleString()
  const bottomContent =
    metric && bottom
      ? bottom
      : (metric?.points || 0).toLocaleString() + ' ' + bottomUnit
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
          <div className={clsx('flex', 'gap-3')}>
            <div className="text-4xl">{value}</div>
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
          {subline}
        </div>
      </OffsetBorderBox>
    </>
  )
}

export default GenericMetricCard
