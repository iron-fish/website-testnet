import { useEffect, useState } from 'react'
import type { UserPointsByPhaseResponse } from 'pages/api/user-points-by-phase'

export default function useUserPointsByPhase(userId?: number) {
  const [pointsData, setPointsData] =
    useState<UserPointsByPhaseResponse | null>(null)

  useEffect(() => {
    if (!userId) return

    async function doFetch() {
      const data = await fetch(
        `/api/user-points-by-phase?userId=${userId}`
      ).then(res => res.json())
      setPointsData(data)
    }

    doFetch()
  }, [userId])

  return pointsData
}
