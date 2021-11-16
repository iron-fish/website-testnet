import type { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'

// SERVER SIDE
const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || '')

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  try {
    const authString = req?.headers?.authorization || ''
    if (!authString) {
      res.status(500).json({ error: 'No auth token provided' })
      return
    }
    const didToken = authString.substr(7)
    await magic.token.validate(didToken)
    res.status(200).json({ authenticated: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
