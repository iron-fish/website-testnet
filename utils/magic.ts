import { Magic } from 'magic-sdk'
export type { MagicUserMetadata } from '@magic-sdk/types'

const KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || ''

const createMagic = (key: string): Magic | undefined => {
  if (typeof window === 'undefined' || !key) {
    return undefined
  }
  // eslint-disable-next-line
  debugger
  return new Magic(key)
}

export const magic = createMagic(KEY)
