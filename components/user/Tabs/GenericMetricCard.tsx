import * as API from 'apiClient'
import MetricCard from 'components/user/MetricCard'

type GenericMetricCardProps = {
  title: string
  metric: API.UserMetric
  bottomUnit?: string
}

export default function GenericMetricCard({
  title,
  metric,
  bottomUnit = 'place',
}: GenericMetricCardProps) {
  return (
    <MetricCard
      title={title}
      value={metric.count.toLocaleString()}
      subValueTop=""
      subValueBottom={metric.points.toLocaleString() + ' ' + bottomUnit}
    />
  )
}
