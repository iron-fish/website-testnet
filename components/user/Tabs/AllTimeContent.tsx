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
  const { code, main } = allTimeMetrics.pools
  const [pool1Info, pool2Info] = summarizePhase(phases[1])
  return (
    <div className="flex gap-3 mt-4 mb-12 flex-wrap">
      <AllTimeMetricCard
        title="Hosted Node"
        metric={allTimeMetrics.metrics.node_uptime}
        top={allTimeMetrics.metrics.node_uptime.count > 1 ? 'hours' : 'hour'}
        bottomUnit="points"
        subline={
          <div className="text-xs text-iflightblue">
            4 hours until next reward
          </div>
        }
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
        title="Pool 1 Rank"
        metric={main}
        showInfo
        info={pool1Info}
        useRank
      />
      <AllTimeMetricCard
        title="Pool 2 Rank"
        metric={code}
        showInfo
        verticalOffset="-4.75rem"
        info={pool2Info}
        useRank
      />
    </div>
  )
}
