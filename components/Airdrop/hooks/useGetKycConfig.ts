import { useEffect, useState } from 'react'
import type { KycConfig } from 'components/Airdrop/types/JumioTypes'

export function useGetKycConfig() {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<KycConfig | null>(null)

  useEffect(() => {
    async function doFetch() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/kyc/config`,
          {
            method: 'GET',
          }
        )

        const data = await res.json()

        setResponse(data)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('fetch config error', err)
      } finally {
        setLoading(false)
      }
    }
    doFetch()
  }, [])

  return {
    loading,
    response,
  }
}
