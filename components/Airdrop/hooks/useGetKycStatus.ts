import { useEffect, useState } from 'react'
import { magic } from 'utils'
import type { KycStatus, JumioWorkflow } from '../types/JumioTypes'

export function useGetKycStatus() {
  const [status, setStatus] = useState<'NOT_STARTED' | KycStatus>('NOT_STARTED')
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<JumioWorkflow | null>(null)

  useEffect(() => {
    async function doFetch() {
      try {
        const apiKey = (await magic?.user.getIdToken()) ?? ''

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kyc`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })

        const contentType = res.headers.get('content-type')

        if (!contentType || !contentType.includes('application/json')) {
          setStatus('NOT_STARTED')
          return
        }

        const data = await res.json()
        setResponse(data)

        // eslint-disable-next-line no-console
        console.log({ data })
        setStatus('FAILED')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('fetch error', err)
      } finally {
        setLoading(false)
      }
    }
    doFetch()
  }, [])

  return {
    status,
    loading,
    response,
  }
}
