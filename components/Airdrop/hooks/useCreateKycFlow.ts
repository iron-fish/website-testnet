import { useEffect, useState } from 'react'
import { magic } from 'utils'
import { JumioWorkflow } from '../types/JumioTypes'

function useCreateKycFlow(userAddress: string, shouldCreateKycFlow: boolean) {
  const [response, setResponse] = useState<
    JumioWorkflow | { error: unknown } | null
  >(null)
  const [postStatus, setPostStatus] = useState<'LOADING' | 'ERROR' | 'SUCCESS'>(
    'LOADING'
  )

  useEffect(() => {
    async function doPost() {
      if (!shouldCreateKycFlow) {
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

        if (res.status >= 400) {
          throw data
        }

        setResponse(data)
        setPostStatus('SUCCESS')
      } catch (err) {
        setPostStatus('ERROR')
        setResponse({ error: err })
      }
    }

    doPost()
  }, [userAddress, shouldCreateKycFlow])

  return {
    response,
    postStatus,
  }
}

export function useGetKycWorkflowUrl(
  workflow: JumioWorkflow | null,
  address: string
) {
  // Skip creating a KYC flow if we have an existing in-progress one
  const shouldCreateKycFlow = workflow === null || workflow.can_create

  const { response: postResponse, postStatus } = useCreateKycFlow(
    address,
    shouldCreateKycFlow
  )

  // Should not get here
  if (workflow === null) {
    return {
      url: null,
      loading: false,
      error: 'Workflow is null',
    }
  }

  // If we don't need to create a KYC flow, return the href from the prior workflow
  if (!shouldCreateKycFlow) {
    return {
      url: workflow.jumio_web_href,
      loading: false,
      error: null,
    }
  }

  // We're loading...
  if (postStatus === 'LOADING') {
    return {
      url: null,
      loading: true,
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
