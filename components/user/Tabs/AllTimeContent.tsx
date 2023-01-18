import React from 'react'

import * as API from 'apiClient'
import AllTimeMetricCard from '../GenericMetricCard'
import TimeCard from '../TimeCard'
import { Phase3, Pool } from 'components/About/data'

type AllTimeContentProps = {
  allTimeMetrics: API.UserMetricsResponse
}

const summarizePool = ({ categories }: { categories: string[] }) =>
  categories.join('\n- ')

const summarizePhase = ({ pools }: { pools: Pool[] }) =>
  pools.map(
    pool => `Pool ${pool.poolNum} categories include:\n- ${summarizePool(pool)}`
  )

const plural = (x: string) => (n: number) => n > 1 ? x + 's' : x

export default function AllTimeContent({
  allTimeMetrics,
}: AllTimeContentProps) {
  const { code, main } = allTimeMetrics.pools
  const [pool4, pool3] = Phase3.pools
  const [pool4Info, pool3Info] = summarizePhase(Phase3)
  const totalHours = allTimeMetrics.node_uptime.total_hours
  const timeUntilReward = 12 - totalHours
  const pluralHours = plural('hour')
  const rewardUnits = pluralHours(timeUntilReward)

  return (
    <div className="flex gap-3 mt-4 mb-12 flex-wrap">
      <TimeCard
        title="Hosted Node"
        timeData={allTimeMetrics.node_uptime}
        top={pluralHours(totalHours)}
        metric={allTimeMetrics.metrics.node_uptime}
        bottomUnit="points"
        subline={
          <div className="text-xs text-iflightblue">
            {`${timeUntilReward} ${rewardUnits} until next reward`}
          </div>
        }
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
        title="Multi-Asset Mint"
        metric={allTimeMetrics.metrics.multi_asset_mint}
      />
      <AllTimeMetricCard
        title="Multi-Asset Burn"
        metric={allTimeMetrics.metrics.multi_asset_burn}
      />
      <AllTimeMetricCard
        title="Multi-Asset Send"
        metric={allTimeMetrics.metrics.multi_asset_transfer}
      />
      <AllTimeMetricCard
        title={`Pool ${pool4.poolNum} Rank`}
        metric={main}
        showInfo
        info={pool4Info}
        useRank
      />
      <AllTimeMetricCard
        title={`Pool ${pool3.poolNum} Rank`}
        metric={code}
        showInfo
        verticalOffset="-4.75rem"
        info={pool3Info}
        useRank
      />
    </div>
  )
}
