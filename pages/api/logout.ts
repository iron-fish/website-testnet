import type { NextApiRequest } from 'next'
import { Magic } from '@magic-sdk/admin'

const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || '')

export default async function logout(req: NextApiRequest) {
  const userPublicAddress = magic.token.getPublicAddress(
    req?.headers?.authorization || ''
  )
  magic.users.logoutByPublicAddress(userPublicAddress)
}
