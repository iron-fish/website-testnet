import React from 'react'

import * as API from 'apiClient'
import { STATUS } from 'hooks/useLogin'

import AllTimeContent from './AllTimeContent'
import SettingsContent from './SettingsContent'
import WeeklyContent from './WeeklyContent'
import { useQueriedToast } from 'hooks/useToast'

export type TabType = 'all' | 'weekly' | 'settings'

type TabsProps = {
  allTimeMetrics: API.UserMetricsResponse
  weeklyMetrics: API.UserMetricsResponse
  metricsConfig: API.MetricsConfigResponse
  user: API.ApiUser
  authedUser: API.ApiUserMetadata | null
  activeTab: TabType
  onTabChange: (tab: TabType) => unknown
  toast: ReturnType<typeof useQueriedToast>
  reloadUser: () => Promise<boolean>
  setFetched: (x: boolean) => unknown
  setUser: (x: API.ApiUser) => unknown
  setUserStatus: (x: STATUS) => unknown
  setRawMetadata: (x: API.ApiUserMetadata) => unknown
}

export default function Tabs({
  allTimeMetrics,
  weeklyMetrics,
  metricsConfig,
  user,
  authedUser,
  activeTab,
  onTabChange,
  toast,
  reloadUser,
  setFetched,
  setUser,
  setUserStatus,
  setRawMetadata,
}: TabsProps) {
  // eslint-disable-next-line
  const allTimeBlocksMined = allTimeMetrics?.metrics?.blocks_mined?.points ?? 0
  const anyBlocksMined = allTimeBlocksMined > 0

  return (
    <div>
      {/* Tabs */}
      <div className="flex font-favorit gap-x-6 mb-8 md:mb-0">
        <TabHeaderButton
          selected={activeTab === 'weekly'}
          onClick={() => onTabChange('weekly')}
        >
          Weekly <span className="hidden md:inline">Stats</span>
        </TabHeaderButton>
        <TabHeaderButton
          selected={activeTab === 'all'}
          onClick={() => onTabChange('all')}
        >
          All Time <span className="hidden md:inline">Stats</span>
        </TabHeaderButton>
        {user && authedUser && authedUser.id === user.id && (
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
      {activeTab === 'settings' && (
        <SettingsContent
          setUserStatus={setUserStatus}
          anyBlocksMined={anyBlocksMined}
          onTabChange={onTabChange}
          user={user}
          authedUser={authedUser}
          toast={toast}
          reloadUser={reloadUser}
          setFetched={setFetched}
          setUser={setUser}
          setRawMetadata={setRawMetadata}
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
