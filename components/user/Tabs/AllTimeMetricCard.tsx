import React from 'react'

import * as API from '../../../apiClient'
import MetricCard from '../MetricCard'
import { numberToOrdinal } from '../../../utils'

type AllTimeMetricCardProps = {
  title: string
  metric: API.UserMetric
}

export default function AllTimeMetricCard({
  title,
  metric,
}: AllTimeMetricCardProps) {
  const rankString =
    metric.rank != null ? `${numberToOrdinal(metric.rank)} place` : ''

  return (
    <MetricCard
      title={title}
      value={metric.count.toLocaleString()}
      subValueTop={`${metric.points.toLocaleString()} points`}
      subValueBottom={rankString}
    />
  )
}
