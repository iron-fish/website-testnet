import React from 'react'

import * as API from 'apiClient'

import AllTimeContent from './AllTimeContent'
import SettingsContent from './SettingsContent'
import WeeklyContent from './WeeklyContent'
import { useQueriedToast } from 'hooks/useToast'

export type TabType = 'all' | 'weekly' | 'settings'

type TabsProps = {
  allTimeMetrics: API.UserMetricsResponse
  weeklyMetrics: API.UserMetricsResponse
  metricsConfig: API.MetricsConfigResponse
  showSettings: boolean
  authedUser: API.ApiUserMetadata | null
  activeTab: TabType
  onTabChange: (tab: TabType) => unknown
  toast: ReturnType<typeof useQueriedToast>
  reloadUser: () => void
}

export default function Tabs({
  allTimeMetrics,
  weeklyMetrics,
  metricsConfig,
  showSettings,
  authedUser,
  activeTab,
  onTabChange,
  toast,
  reloadUser,
}: TabsProps) {
  const allTimeBlocksMined = allTimeMetrics?.metrics?.blocks_mined?.points ?? 0
  const anyBlocksMined = allTimeBlocksMined > 0

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
        {showSettings && (
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
      {activeTab === 'settings' && authedUser && (
        <SettingsContent
          anyBlocksMined={anyBlocksMined}
          authedUser={authedUser}
          toast={toast}
          reloadUser={reloadUser}
        />
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
