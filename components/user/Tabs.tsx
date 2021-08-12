import React from 'react'
import * as API from '../../apiClient'
import { numberToOrdinal } from '../../utils'

import MetricCard from './MetricCard'

type TabType = 'all' | 'weekly' | 'settings'

type TabsProps = {
  allTimeMetrics: API.UserMetricsResponse
  weeklyMetrics: API.UserMetricsResponse
  initialTab?: TabType
  metricsConfig: API.MetricsConfigResponse
  settingsVisible: boolean
}

export default function Tabs({
  allTimeMetrics,
  weeklyMetrics,
  initialTab = 'weekly',
  metricsConfig,
  settingsVisible,
}: TabsProps) {
  const [selectedTab, setSelectedTab] = React.useState<TabType>(initialTab)

  return (
    <div>
      {/* Tabs */}
      <div className="flex font-favorit gap-x-6">
        <TabHeaderButton
          selected={selectedTab === 'weekly'}
          onClick={() => setSelectedTab('weekly')}
        >
          Weekly Stats
        </TabHeaderButton>
        <TabHeaderButton
          selected={selectedTab === 'all'}
          onClick={() => setSelectedTab('all')}
        >
          All Time Stats
        </TabHeaderButton>
        {settingsVisible && (
          <TabHeaderButton
            selected={selectedTab === 'settings'}
            onClick={() => setSelectedTab('settings')}
          >
            Settings
          </TabHeaderButton>
        )}
      </div>

      {/* Tabs Content */}
      {selectedTab === 'weekly' && (
        <WeeklyContent
          weeklyMetrics={weeklyMetrics}
          metricsConfig={metricsConfig}
        />
      )}
      {selectedTab === 'all' && (
        <AllContent
          allTimeMetrics={allTimeMetrics}
          metricsConfig={metricsConfig}
        />
      )}
      {selectedTab === 'settings' && <SettingsContent />}
    </div>
  )
}

type TabHeaderButtonProps = {
  onClick: () => unknown
  selected: boolean
  children: React.ReactNode
}

function TabHeaderButton({
  onClick,
  selected,
  children,
}: TabHeaderButtonProps) {
  const selectedClass = 'text-black'
  const deselectedClass = 'text-ifsubtextgray'

  return (
    <button
      className={selected ? selectedClass : deselectedClass}
      onClick={onClick}
    >
      <div className="relative">
        {children}
        {selected && (
          <span className="absolute left-0 right-0 bottom-0 border-b border-black" />
        )}
      </div>
    </button>
  )
}

type WeeklyContentProps = {
  weeklyMetrics: API.UserMetricsResponse
  metricsConfig: API.MetricsConfigResponse
}

function WeeklyContent({ weeklyMetrics, metricsConfig }: WeeklyContentProps) {
  return (
    <div className="flex gap-3 mt-4 mb-12 flex-wrap">
      <WeeklyMetricCard
        title="Blocks Mined"
        metricValue={weeklyMetrics.metrics.blocks_mined}
        metricValueMax={
          metricsConfig.weekly_limits.BLOCK_MINED /
          metricsConfig.points_per_category.BLOCK_MINED
        }
        pointsValue={
          weeklyMetrics.metrics.blocks_mined *
          metricsConfig.points_per_category.BLOCK_MINED
        }
      />
      <WeeklyMetricCard
        title="Bugs Caught"
        metricValue={weeklyMetrics.metrics.bugs_caught}
        metricValueMax={
          metricsConfig.weekly_limits.BUG_CAUGHT /
          metricsConfig.points_per_category.BUG_CAUGHT
        }
        pointsValue={
          weeklyMetrics.metrics.bugs_caught *
          metricsConfig.points_per_category.BUG_CAUGHT
        }
      />
      <WeeklyMetricCard
        title="Promotions"
        metricValue={weeklyMetrics.metrics.social_media_contributions}
        metricValueMax={
          metricsConfig.weekly_limits.SOCIAL_MEDIA_PROMOTION /
          metricsConfig.points_per_category.SOCIAL_MEDIA_PROMOTION
        }
        pointsValue={
          weeklyMetrics.metrics.social_media_contributions *
          metricsConfig.points_per_category.SOCIAL_MEDIA_PROMOTION
        }
      />
      <WeeklyMetricCard
        title="PRs Merged"
        metricValue={weeklyMetrics.metrics.pull_requests_merged}
        metricValueMax={
          metricsConfig.weekly_limits.PULL_REQUEST_MERGED /
          metricsConfig.points_per_category.PULL_REQUEST_MERGED
        }
        pointsValue={
          weeklyMetrics.metrics.pull_requests_merged *
          metricsConfig.points_per_category.PULL_REQUEST_MERGED
        }
      />
      <WeeklyMetricCard
        title="Community Contributions"
        metricValue={weeklyMetrics.metrics.community_contributions}
        metricValueMax={
          metricsConfig.weekly_limits.COMMUNITY_CONTRIBUTION /
          metricsConfig.points_per_category.COMMUNITY_CONTRIBUTION
        }
        pointsValue={
          weeklyMetrics.metrics.community_contributions *
          metricsConfig.points_per_category.COMMUNITY_CONTRIBUTION
        }
      />
    </div>
  )
}

type AllContentProps = {
  allTimeMetrics: API.UserMetricsResponse
  metricsConfig: API.MetricsConfigResponse
}

function AllContent({ allTimeMetrics, metricsConfig }: AllContentProps) {
  return (
    <div className="flex gap-3 mt-4 mb-12 flex-wrap">
      <AllTimeMetricCard
        title="Blocks Mined"
        metricValue={allTimeMetrics.metrics.blocks_mined}
        pointsValue={
          metricsConfig.points_per_category.BLOCK_MINED *
          allTimeMetrics.metrics.blocks_mined
        }
        rank={0}
      />
      <AllTimeMetricCard
        title="Bugs Caught"
        metricValue={allTimeMetrics.metrics.bugs_caught}
        pointsValue={
          metricsConfig.points_per_category.BUG_CAUGHT *
          allTimeMetrics.metrics.bugs_caught
        }
        rank={0}
      />
      <AllTimeMetricCard
        title="Promotions"
        metricValue={allTimeMetrics.metrics.social_media_contributions}
        pointsValue={
          metricsConfig.points_per_category.SOCIAL_MEDIA_PROMOTION *
          allTimeMetrics.metrics.social_media_contributions
        }
        rank={0}
      />
      <AllTimeMetricCard
        title="PRs Merged"
        metricValue={allTimeMetrics.metrics.pull_requests_merged}
        pointsValue={
          metricsConfig.points_per_category.PULL_REQUEST_MERGED *
          allTimeMetrics.metrics.pull_requests_merged
        }
        rank={0}
      />
      <AllTimeMetricCard
        title="Community Contributions"
        metricValue={allTimeMetrics.metrics.community_contributions}
        pointsValue={
          metricsConfig.points_per_category.COMMUNITY_CONTRIBUTION *
          allTimeMetrics.metrics.community_contributions
        }
        rank={0}
      />
    </div>
  )
}

function SettingsContent() {
  return <div>TODO</div>
}

type WeeklyMetricCardProps = {
  title: string
  metricValue: number
  metricValueMax: number
  pointsValue: number
}

function WeeklyMetricCard({
  title,
  metricValue,
  metricValueMax,
  pointsValue,
}: WeeklyMetricCardProps) {
  return (
    <MetricCard
      title={title}
      value={metricValue.toLocaleString()}
      subValueTop={`/ ${metricValueMax.toLocaleString()}`}
      subValueBottom={`${pointsValue.toLocaleString()} points`}
    />
  )
}

type AllTimeMetricCardProps = {
  title: string
  metricValue: number
  pointsValue: number
  rank: number
}

function AllTimeMetricCard({
  title,
  metricValue,
  pointsValue,
  rank,
}: AllTimeMetricCardProps) {
  return (
    <MetricCard
      title={title}
      value={metricValue.toLocaleString()}
      subValueTop={`${pointsValue.toLocaleString()} points`}
      subValueBottom={`${numberToOrdinal(rank)} place`}
    />
  )
}
