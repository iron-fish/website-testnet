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
        title="Blocks Mined"
        metric={allTimeMetrics.metrics.blocks_mined}
      />
      <AllTimeMetricCard
        title="Bugs Caught"
        metric={allTimeMetrics.metrics.bugs_caught}
      />
      <AllTimeMetricCard
        title="Promotions"
        metric={allTimeMetrics.metrics.social_media_contributions}
      />
      <AllTimeMetricCard
        title="PRs Merged"
        metric={allTimeMetrics.metrics.pull_requests_merged}
      />
      <AllTimeMetricCard
        title="Community Changes"
        metric={allTimeMetrics.metrics.community_contributions}
      />
    </div>
  )
}
