import { useEffect, useState } from 'react'
import * as API from 'apiClient/client'
import { UserMetricsResponse } from 'apiClient'

export default function useUserAllTimeMetrics(userId?: number) {
  const [metricsData, setMetricsData] = useState<UserMetricsResponse | null>(
    null
  )

  useEffect(() => {
    async function doFetch() {
      if (!userId) return

      const data = await API.getUserAllTimeMetrics(userId.toString())

      if (!API.isGenericError(data)) {
        setMetricsData(data)
      }
    }

    doFetch()
  }, [userId])

  return metricsData
}
