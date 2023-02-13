import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // eslint-disable-next-line no-console
  console.log(request.headers)

  response.status(200).json({})

  return

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const userId = formatUserId(JSON.parse(request.body)?.userId)

  if (!userId) {
    return response.status(400).json({ error: 'Missing user id' })
  }

  const authString = `${process.env.JUMIO_API_TOKEN}:${process.env.JUMIO_API_SECRET}`
  const authToken = Buffer.from(authString).toString('base64')

  const payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // "Content-Length": (see RFC-7230)
      Authorization: `Basic ${authToken}`,
      'User-Agent': 'IronFish Website/v1.0',
    },
    body: JSON.stringify({
      // Your internal reference for the transaction.
      customerInternalReference: userId,
      // Your internal reference for the user.
      userReference: userId,
    }),
  }

  try {
    const jumioResponse = await fetch(
      'https://netverify.com/api/v4/initiate',
      payload
    )

    const data = await jumioResponse.json()

    response.status(200).json(data)
  } catch (err) {
    return response.status(500).json({ error: 'Temporary error message...' })
  }
}

function formatUserId(userId: unknown) {
  if (typeof userId !== 'string' && typeof userId !== 'number') {
    return null
  }

  return `${userId}`
}
