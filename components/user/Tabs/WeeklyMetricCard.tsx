import React from 'react'

import * as API from 'apiClient'
import MetricCard from 'components/user/MetricCard'

type WeeklyMetricCardProps = {
  title: string
  metric: API.UserMetric
  metricValueMax: number
  unit: string
}

export default function WeeklyMetricCard({
  title,
  metric,
  metricValueMax,
  unit,
}: WeeklyMetricCardProps) {
  return (
    <MetricCard
      title={title}
      value={metric.points.toLocaleString()}
      subValueTop={`/ ${metricValueMax.toLocaleString()}`}
      subValueBottom={`${metric.count.toLocaleString()} ${unit}`}
    />
  )
}
