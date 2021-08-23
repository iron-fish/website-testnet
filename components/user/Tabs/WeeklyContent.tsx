import React from 'react'

import * as API from 'apiClient'
import WeeklyMetricCard from './WeeklyMetricCard'

type WeeklyContentProps = {
  weeklyMetrics: API.UserMetricsResponse
  metricsConfig: API.MetricsConfigResponse
}

// Given a metrics config response, computes the maximum number of
// events for a given metric that can be scored per-week.
function getWeeklyMetricMax(
  key: API.EventType,
  metricsConfig: API.MetricsConfigResponse
) {
  return (
    metricsConfig.weekly_limits[key] /
    metricsConfig.points_per_category.BLOCK_MINED
  )
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
        metricValueMax={getWeeklyMetricMax(
          API.EventType.BLOCK_MINED,
          metricsConfig
        )}
      />
      <WeeklyMetricCard
        title="Bugs Caught"
        metric={weeklyMetrics.metrics.bugs_caught}
        metricValueMax={getWeeklyMetricMax(
          API.EventType.BUG_CAUGHT,
          metricsConfig
        )}
      />
      <WeeklyMetricCard
        title="Promotions"
        metric={weeklyMetrics.metrics.social_media_contributions}
        metricValueMax={getWeeklyMetricMax(
          API.EventType.SOCIAL_MEDIA_PROMOTION,
          metricsConfig
        )}
      />
      <WeeklyMetricCard
        title="PRs Merged"
        metric={weeklyMetrics.metrics.pull_requests_merged}
        metricValueMax={getWeeklyMetricMax(
          API.EventType.PULL_REQUEST_MERGED,
          metricsConfig
        )}
      />
      <WeeklyMetricCard
        title="Community Contributions"
        metric={weeklyMetrics.metrics.community_contributions}
        metricValueMax={getWeeklyMetricMax(
          API.EventType.COMMUNITY_CONTRIBUTION,
          metricsConfig
        )}
      />
    </div>
  )
}
