import React from 'react'

import * as API from '../../../apiClient'

import AllTimeContent from './AllTimeContent'
import SettingsContent from './SettingsContent'
import WeeklyContent from './WeeklyContent'

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
        <AllTimeContent allTimeMetrics={allTimeMetrics} />
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
