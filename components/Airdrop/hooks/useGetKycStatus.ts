import { useEffect, useState } from 'react'
import { magic } from 'utils'
import type { KycStatus, JumioWorkflow } from '../types/JumioTypes'

export function useGetKycStatus(interval?: number) {
  const [status, setStatus] = useState<'NOT_STARTED' | KycStatus>('NOT_STARTED')
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<JumioWorkflow | null>(null)

  useEffect(() => {
    async function doFetch() {
      try {
        let token
        try {
          token = await magic?.user.getIdToken()
        } catch (error) {}
        const headers: HeadersInit = {}

        if (token) {
          headers.Authorization = `Bearer ${token}`
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kyc`, {
          method: 'GET',
          headers,
          credentials: 'include',
        })

        const data = await res.json()

        setResponse(data)
        setStatus(data.kyc_status ?? 'NOT_STARTED')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('fetch error', err)
      } finally {
        setLoading(false)
      }
    }
    doFetch()

    if (interval) {
      const intervalId = setInterval(doFetch, interval)

      return () => clearInterval(intervalId)
    }
  }, [interval])

  return {
    status,
    loading,
    response,
  }
}
