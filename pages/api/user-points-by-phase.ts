import type { NextApiRequest, NextApiResponse } from 'next'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

function makePath(baseUrl: string, userId: string) {
  return `${baseUrl}/users/${userId}/metrics?granularity=lifetime`
}

export type UserPointsByPhaseResponse = {
  openSource: number
  phase1: number
  phase2: number
  phase3: number
  total: number
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<UserPointsByPhaseResponse | { error: string }>
) {
  if (typeof apiUrl !== 'string') {
    throw new Error('phase3Url must be a string')
  }

  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const userId = request.query.userId

  if (typeof userId !== 'string' || !userId) {
    return response.status(400).json({ error: 'Invalid userId' })
  }

  const metrics = await fetch(makePath(apiUrl, userId)).then(res => res.json())

  response.status(200).json({
    openSource: metrics.pool_points['pool_three'],
    phase1: metrics.pool_points['pool_one'],
    phase2: metrics.pool_points['pool_two'],
    phase3: metrics.pool_points['pool_four'],
    total:
      metrics.pool_points['pool_three'] +
      metrics.pool_points['pool_one'] +
      metrics.pool_points['pool_two'] +
      metrics.pool_points['pool_four'],
  })
}
