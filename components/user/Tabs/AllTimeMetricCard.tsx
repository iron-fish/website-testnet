import React from 'react'

import * as API from 'apiClient'
import MetricCard from 'components/user/MetricCard'
import { numberToOrdinal } from 'utils'

type AllTimeMetricCardProps = {
  title: string
  metric: API.UserMetric
  ranked?: boolean
  topUnit?: string
  bottomUnit?: string
}

export default function AllTimeMetricCard({
  title,
  metric,
  ranked = true,
  topUnit = 'points',
  bottomUnit = 'place',
}: AllTimeMetricCardProps) {
  let top, bottom
  if (ranked) {
    bottom =
      metric.rank != null ? `${numberToOrdinal(metric.rank)} ${bottomUnit}` : ''
    top = `${metric.points.toLocaleString()} ${topUnit}`
  } else {
    bottom = `${metric.points} ${bottomUnit}`
    top = metric.count > 1 ? `hours` : `hour`
  }
  return (
    <MetricCard
      title={title}
      value={metric.count.toLocaleString()}
      subValueTop={top}
      subValueBottom={bottom}
    />
  )
}
