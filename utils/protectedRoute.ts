// import type { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'

// SERVER SIDE
const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY || '')

type TravelPath = {
  ifLoggedIn?: string
  ifLoggedOut?: string
}

export function protectedRoute({ ifLoggedIn, ifLoggedOut }: TravelPath) {
  if (magic?.token) {
    return { redirect: { destination: ifLoggedIn || ifLoggedOut } }
  }
  return { props: {} }
}
export default protectedRoute
