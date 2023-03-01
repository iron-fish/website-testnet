import { useEffect, useState } from 'react'
import { magic } from 'utils'

export function useCreateKycFlow(userAddress: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null)
  const [postStatus, setPostStatus] = useState<'LOADING' | 'ERROR' | 'SUCCESS'>(
    'LOADING'
  )

  useEffect(() => {
    async function doPost() {
      setPostStatus('LOADING')

      try {
        const apiKey = (await magic?.user.getIdToken()) ?? ''

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kyc`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            public_address: userAddress,
          }),
        })

        const data = await res.json()

        if (res.status !== 200) {
          throw data
        }

        // eslint-disable-next-line no-console
        console.log({ data })

        setResponse(data)
      } catch (err) {
        setPostStatus('ERROR')
        setResponse(err)
      }
    }

    doPost()
  }, [userAddress])

  return {
    response,
    postStatus,
  }
}
