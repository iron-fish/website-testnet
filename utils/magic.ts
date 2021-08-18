import { Magic } from 'magic-sdk'

const KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || ''

const createMagic = (key: string) => {
  if (typeof window === 'undefined' || !key) {
    return false
  }
  return new Magic(key)
}

export const magic = createMagic(KEY)
