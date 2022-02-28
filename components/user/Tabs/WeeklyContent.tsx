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
  const {
    [API.EventType.BLOCK_MINED]: blockMinedLimit,
    [API.EventType.BUG_CAUGHT]: bugsCaughtWeeklyLimit,
    [API.EventType.SOCIAL_MEDIA_PROMOTION]: promotionLimit,
    [API.EventType.PULL_REQUEST_MERGED]: prLimit,
    [API.EventType.COMMUNITY_CONTRIBUTION]: contributionLimit,
  } = metricsConfig.weekly_limits

  return (
    <div className="flex gap-3 mt-4 mb-12 flex-wrap">
      <WeeklyMetricCard
        title="Blocks Mined"
        metric={weeklyMetrics.metrics.blocks_mined}
        metricValueMax={blockMinedLimit}
        unit="blocks"
      />
      <WeeklyMetricCard
        title="Bugs Caught"
        metric={weeklyMetrics.metrics.bugs_caught}
        metricValueMax={bugsCaughtWeeklyLimit}
        unit="bugs"
      />
      <WeeklyMetricCard
        title="Promotions"
        metric={weeklyMetrics.metrics.social_media_contributions}
        metricValueMax={promotionLimit}
        unit="promotions"
      />
      <WeeklyMetricCard
        title="PRs Merged"
        metric={weeklyMetrics.metrics.pull_requests_merged}
        metricValueMax={prLimit}
        unit="PRs"
      />
      <WeeklyMetricCard
        title="Community"
        metric={weeklyMetrics.metrics.community_contributions}
        metricValueMax={contributionLimit}
        unit="contributions"
      />
    </div>
  )
}
