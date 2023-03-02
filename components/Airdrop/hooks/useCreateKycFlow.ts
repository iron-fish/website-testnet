import { useEffect, useState } from 'react'
import { magic } from 'utils'
import { JumioWorkflow } from '../types/JumioTypes'
import { useGetKycStatus } from './useGetKycStatus'

export function useCreateKycFlow(userAddress: string, skip = false) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<
    JumioWorkflow | { error: unknown } | null
  >(null)
  const [postStatus, setPostStatus] = useState<'LOADING' | 'ERROR' | 'SUCCESS'>(
    'LOADING'
  )

  useEffect(() => {
    async function doPost() {
      if (skip) {
        return
      }

      setPostStatus('LOADING')

      try {
        const apiKey = (await magic?.user.getIdToken()) ?? ''

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kyc`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
        setPostStatus('SUCCESS')
      } catch (err) {
        setPostStatus('ERROR')
        setResponse({ error: err })
      }
    }

    doPost()
  }, [userAddress, skip])

  return {
    response,
    postStatus,
  }
}

export function useGetKycWorkflowUrl(address: string) {
  const {
    status: getStatus,
    loading: isGetLoading,
    response: getResponse,
  } = useGetKycStatus()

  const { response: postResponse, postStatus } = useCreateKycFlow(
    address,
    isGetLoading || getStatus === 'IN_PROGRESS'
  )

  // We're loading...
  if (isGetLoading && postStatus === 'LOADING') {
    return {
      url: null,
      loading: true,
      error: null,
    }
  }

  // If we have a response from the GET request, and the user's workflow status is
  // IN_PROGRESS, then we can return the in-progress workflow URL.0
  if (
    !isGetLoading &&
    getStatus === 'IN_PROGRESS' &&
    getResponse !== null &&
    'jumio_web_href' in getResponse
  ) {
    return {
      url: getResponse.jumio_web_href,
      loading: false,
      error: null,
    }
  }

  // If we have a successful response from the POST request, and it included a jumio_web_href
  // then we return that.
  if (
    postStatus === 'SUCCESS' &&
    postResponse !== null &&
    'jumio_web_href' in postResponse
  ) {
    return {
      url: postResponse.jumio_web_href,
      loading: false,
      error: null,
    }
  }

  // If were're here, then we have an error.
  return {
    url: null,
    loading: false,
    error: postResponse,
  }
}
