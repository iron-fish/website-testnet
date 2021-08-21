import { useEffect, useState } from 'react'

// With a URL like: coolwebsite.com?nice=dope
// const $nice = useQuery('nice') === 'dope'
export function useQuery(key: string): string | null {
  // our state
  const [$query, $setQuery] = useState<string | null>(null)

  useEffect(() => {
    // only for ze browser
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
