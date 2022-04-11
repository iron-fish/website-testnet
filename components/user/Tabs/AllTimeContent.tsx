import React from 'react'

import * as API from 'apiClient'
import AllTimeMetricCard from './GenericMetricCard'
import { phases, Pool } from 'components/About/data'

type AllTimeContentProps = {
  allTimeMetrics: API.UserMetricsResponse
}

const summarizePool = ({ categories }: { categories: string[] }) =>
  categories.join('\n- ')

const summarizePhase = ({ pools }: { pools: Pool[] }) =>
  pools.map(
    (pool, i) => `Pool ${i + 1} categories include:\n- ${summarizePool(pool)}`
  )

export default function AllTimeContent({
  allTimeMetrics,
}: AllTimeContentProps) {
  const [pool1Info, pool2Info] = summarizePhase(phases[1])
  return (
    <div className="flex gap-3 mt-4 mb-12 flex-wrap">
      <AllTimeMetricCard
        title="Hosted Node"
        metric={allTimeMetrics.metrics.node_online_hours}
        top="hour"
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
      <AllTimeMetricCard
        title="Pool 1 Rank"
        metric={allTimeMetrics.metrics.pool_1_rank}
        showInfo
        info={pool1Info}
      />
      <AllTimeMetricCard
        title="Pool 2 Rank"
        metric={allTimeMetrics.metrics.pool_2_rank}
        showInfo
        verticalOffset="-4.75rem"
        info={pool2Info}
      />
    </div>
  )
}
