import { useEffect, useState } from 'react'

export function useQuery(key: string): string | null {
  const [$query, $setQuery] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const parsed = new URLSearchParams((window.location.search || '').slice(1))
    const value = parsed.get(key)
    if (typeof value === 'string') {
      $setQuery(value)
    }
  }, [$query, $setQuery, key])
  return $query
}
export default useQuery
