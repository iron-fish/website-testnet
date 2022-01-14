import React from 'react'

import * as API from 'apiClient'
import WeeklyMetricCard from './WeeklyMetricCard'

type WeeklyContentProps = {
  weeklyMetrics: API.UserMetricsResponse
  metricsConfig: API.MetricsConfigResponse
}

export default function WeeklyContent({
  weeklyMetrics,
  metricsConfig,
}: WeeklyContentProps) {
  return (
    <div className="flex gap-3 mt-4 mb-12 flex-wrap">
      <WeeklyMetricCard
        title="Blocks Mined"
        metric={weeklyMetrics.metrics.blocks_mined}
        metricValueMax={metricsConfig.weekly_limits[API.EventType.BLOCK_MINED]}
        unit="blocks"
      />
      <WeeklyMetricCard
        title="Bugs Caught"
        metric={weeklyMetrics.metrics.bugs_caught}
        metricValueMax={metricsConfig.weekly_limits[API.EventType.BUG_CAUGHT]}
        unit="bugs"
      />
      <WeeklyMetricCard
        title="Promotions"
        metric={weeklyMetrics.metrics.social_media_contributions}
        metricValueMax={
          metricsConfig.weekly_limits[API.EventType.SOCIAL_MEDIA_PROMOTION]
        }
        unit="promotions"
      />
      <WeeklyMetricCard
        title="PRs Merged"
        metric={weeklyMetrics.metrics.pull_requests_merged}
        metricValueMax={
          metricsConfig.weekly_limits[API.EventType.PULL_REQUEST_MERGED]
        }
        unit="PRs"
      />
      <WeeklyMetricCard
        title="Community Contributions"
        metric={weeklyMetrics.metrics.community_contributions}
        metricValueMax={
          metricsConfig.weekly_limits[API.EventType.COMMUNITY_CONTRIBUTION]
        }
        unit="contributions"
      />
    </div>
  )
}
