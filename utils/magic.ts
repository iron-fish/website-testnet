import { Magic } from 'magic-sdk'
export type { MagicUserMetadata } from '@magic-sdk/types'

const KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || ''

const createMagic = (key: string): Magic | undefined => {
  // eslint-disable-next-line
  console.log('CREATING MAGIC', typeof window)
  if (typeof window === 'undefined' || !key) {
    // eslint-disable-next-line
    console.log('INVALID KEY OR NO WINDOW?', typeof window, key)
    debugger
    return undefined
  }
  // eslint-disable-next-line
  debugger
  return new Magic(key)
}

export const magic = createMagic(KEY)
