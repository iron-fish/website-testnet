import { useEffect, useState } from 'react'

const querify = (key: string, x: string): string | boolean => {
  if (!~x.indexOf(key)) return false
  const raw = x.split('&').map(w => w.split('='))
  if (raw.length > 0) {
    return raw.filter(([k]) => k === key)[0][1]
  }
  return false
}

export function useQuery(key: string): string | null {
  const [$q, $setter] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const value = querify(
      key,
      (window.location.search || '').slice(1, Infinity)
    )
    if (typeof value === 'string') {
      $setter(value)
    }
  }, [$q, $setter, key])
  return $q
}
export default useQuery
