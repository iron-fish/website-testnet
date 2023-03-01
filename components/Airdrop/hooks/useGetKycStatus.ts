import { useEffect, useState } from 'react'
import { magic } from 'utils'

type Status =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'TRY_AGAIN'
  | 'FAILED'
  | 'SUBMITTED'
  | 'SUCCESS'

export function useGetKycStatus() {
  const [status, setStatus] = useState<Status>('NOT_STARTED')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function doFetch() {
      const apiKey = (await magic?.user.getIdToken()) ?? ''

      try {
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
  }
}
