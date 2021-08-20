import { useEffect, useState } from 'react'

export function useQuery(key: string): string | null {
  const [$q, $setter] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const parsed = new URLSearchParams((window.location.search || '').slice(1))
    const value = parsed.get(key)
    if (typeof value === 'string') {
      $setter(value)
    }
  }, [$q, $setter, key])
  return $q
}
export default useQuery
