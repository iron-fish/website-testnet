import { Magic } from 'magic-sdk'
export type { MagicUserMetadata } from '@magic-sdk/types'

const KEY = process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY || ''

const createMagic = (key: string): Magic | undefined => {
  if (typeof window === 'undefined' || !key) {
    return undefined
  }
  return new Magic(key)
}

export const magic = createMagic(KEY)
