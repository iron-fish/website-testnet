import React from 'react'

import * as API from 'apiClient'
import MetricCard from 'components/user/MetricCard'

type WeeklyMetricCardProps = {
  title: string
  metric: API.UserMetric
  metricValueMax: number
}

export default function WeeklyMetricCard({
  title,
  metric,
  metricValueMax,
}: WeeklyMetricCardProps) {
  return (
    <MetricCard
      title={title}
      value={metric.count.toLocaleString()}
      subValueTop={`/ ${metricValueMax.toLocaleString()}`}
      subValueBottom={`${metric.points.toLocaleString()} points`}
    />
  )
}
