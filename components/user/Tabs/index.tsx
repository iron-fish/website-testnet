import React from 'react'

import * as API from 'apiClient'

import AllTimeContent from './AllTimeContent'
import SettingsContent from './SettingsContent'
import WeeklyContent from './WeeklyContent'

export type TabType = 'all' | 'weekly' | 'settings'

type TabsProps = {
  allTimeMetrics: API.UserMetricsResponse
  weeklyMetrics: API.UserMetricsResponse
  metricsConfig: API.MetricsConfigResponse
  userMetadata: API.ApiUserMetadata | null
  activeTab: TabType
  onTabChange: (tab: TabType) => unknown
}

export default function Tabs({
  allTimeMetrics,
  weeklyMetrics,
  metricsConfig,
  userMetadata,
  activeTab,
  onTabChange,
}: TabsProps) {
  return (
    <div>
      {/* Tabs */}
      <div className="flex font-favorit gap-x-6">
        <TabHeaderButton
          selected={activeTab === 'weekly'}
          onClick={() => onTabChange('weekly')}
        >
          Weekly Stats
        </TabHeaderButton>
        <TabHeaderButton
          selected={activeTab === 'all'}
          onClick={() => onTabChange('all')}
        >
          All Time Stats
        </TabHeaderButton>
        {userMetadata && (
          <TabHeaderButton
            selected={activeTab === 'settings'}
            onClick={() => onTabChange('settings')}
          >
            Settings
          </TabHeaderButton>
        )}
      </div>

      {/* Tabs Content */}
      {activeTab === 'weekly' && (
        <WeeklyContent
          weeklyMetrics={weeklyMetrics}
          metricsConfig={metricsConfig}
        />
      )}
      {activeTab === 'all' && (
        <AllTimeContent allTimeMetrics={allTimeMetrics} />
      )}
      {activeTab === 'settings' && userMetadata && (
        <SettingsContent userMetadata={userMetadata} />
      )}
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
