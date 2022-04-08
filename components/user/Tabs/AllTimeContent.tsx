import React from 'react'

import * as API from 'apiClient'
import AllTimeMetricCard from './AllTimeMetricCard'

type AllTimeContentProps = {
  allTimeMetrics: API.UserMetricsResponse
}

export default function AllTimeContent({
  allTimeMetrics,
}: AllTimeContentProps) {
  return (
    <div className="flex gap-3 mt-4 mb-12 flex-wrap">
      <AllTimeMetricCard
        title="Hosted Node"
        metric={allTimeMetrics.metrics.node_online_hours}
        ranked={false}
        topUnit="hour"
        bottomUnit="points"
      />
      <AllTimeMetricCard
        title="Transactions Sent"
        metric={allTimeMetrics.metrics.transactions_sent}
      />
      <AllTimeMetricCard
        title="Bugs Caught"
        metric={allTimeMetrics.metrics.bugs_caught}
      />
      <AllTimeMetricCard
        title="PRs Merged"
        metric={allTimeMetrics.metrics.pull_requests_merged}
      />
      <AllTimeMetricCard
        title="Community"
        metric={allTimeMetrics.metrics.community_contributions}
      />
    </div>
  )
}
