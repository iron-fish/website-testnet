import type { NextApiRequest, NextApiResponse } from 'next'

const RISK_THRESHOLD = 70

function isVerified(decision: string, risk: number) {
  if (decision === 'PASSED') {
    return true
  }
  if (decision === 'WARNING' && risk < RISK_THRESHOLD) {
    return true
  }
  return false
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const accountId = request.query.accountId
  const workflowExecutionId = request.query.workflowExecutionId

  const authString = `${process.env.JUMIO_API_TOKEN}:${process.env.JUMIO_API_SECRET}`
  const authToken = Buffer.from(authString).toString('base64')

  const res = await fetch(
    `https://retrieval.amer-1.jumio.ai/api/v1/accounts/${accountId}/workflow-executions/${workflowExecutionId}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${authToken}`,
        'User-Agent': 'IronFish Website/v1.0',
      },
    }
  )

  const data = await res.json()

  if (res.status === 200) {
    return response.status(200).json({
      verified: isVerified(data.decision.type, data.decision.risk.score),
      completedAt: data.completedAt,
    })
  }

  if (res.status === 404) {
    return response.status(200).json({
      verified: false,
      completedAt: null,
    })
  }

  response.status(500).json({
    error: 'Something went wrong, please try again later.',
  })
}
