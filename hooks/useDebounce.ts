import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, timeoutMs: number): T {
  const [$debouncedValue, $setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handle = setTimeout(() => {
      $setDebouncedValue(value)
    }, timeoutMs)

    return () => {
      clearTimeout(handle)
    }
  }, [value, timeoutMs])

  return $debouncedValue
}

export default useDebounce
