import { useEffect, useState } from 'react'

const _rejectedTransaction = {
  accountId: '8e258a6e-52ea-4b61-8883-1a70260985a7',
  workflowExecutionId: '2c2c18f6-9f0e-439f-9fb8-7fb124ad3271',
}

const _warningTransaction = {
  accountId: '56930c2a-2213-45d4-be28-9d751a8f8f55',
  workflowExecutionId: '85b26f35-cf4e-4a68-8bce-88c20f06d3ff',
}

const _junkTransaction = {
  accountId: 'abc-123',
  workflowExecutionId: 'abc-123',
}

export function useJumioStatus({
  accountId,
  workflowExecutionId,
}: {
  accountId: string
  workflowExecutionId: string
} = _rejectedTransaction) {
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<{
    verified: boolean
    completedAt: string | null
  }>({
    verified: false,
    completedAt: null,
  })

  useEffect(() => {
    async function doFetch() {
      const data = await fetch(
        `/api/jumio-status?accountId=${accountId}&workflowExecutionId=${workflowExecutionId}`
      ).then(res => res.json())

      setStatus(data)
      setLoading(false)
    }
    doFetch()
  }, [accountId, workflowExecutionId])

  return {
    loading,
    status,
  }
}
