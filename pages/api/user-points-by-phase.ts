import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiError, UserMetricsResponse } from 'apiClient'

const phase1Url = 'https://phase1.api.ironfish.network'
const phase2Url = 'https://phase2.api.ironfish.network'
const phase3Url = process.env.NEXT_PUBLIC_API_URL

function makePath(baseUrl: string, userId: string) {
  return `${baseUrl}/users/${userId}/metrics?granularity=lifetime`
}

function getPointsForPhase(phase: UserMetricsResponse | ApiError) {
  if ('statusCode' in phase) {
    return {
      openSource: 0,
      other: 0,
    }
  }

  const openSourcePoints = phase.metrics.pull_requests_merged.points

  return {
    openSource: openSourcePoints,
    other: phase.points - openSourcePoints,
  }
}

export type UserPointsByPhaseResponse = {
  openSource: number
  phase1: number
  phase2: number
  phase3: number
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<UserPointsByPhaseResponse | { error: string }>
) {
  if (typeof phase3Url !== 'string') {
    throw new Error('phase3Url must be a string')
  }

  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const userId = request.query.userId

  if (typeof userId !== 'string' || !userId) {
    return response.status(400).json({ error: 'Invalid userId' })
  }

  const [phase1, phase2, phase3] = await Promise.all([
    fetch(makePath(phase1Url, userId)).then(res => res.json()),
    fetch(makePath(phase2Url, userId)).then(res => res.json()),
    fetch(makePath(phase3Url, userId)).then(res => res.json()),
  ])

  const phase1Points = getPointsForPhase(phase1)
  const phase2Points = getPointsForPhase(phase2)
  const phase3Points = getPointsForPhase(phase3)

  const openSourcePoints =
    phase1Points.openSource + phase2Points.openSource + phase3Points.openSource

  response.status(200).json({
    openSource: openSourcePoints,
    phase1: phase1Points.other,
    phase2: phase2Points.other,
    phase3: phase3Points.other - phase2Points.other - phase1Points.other,
  })
}
