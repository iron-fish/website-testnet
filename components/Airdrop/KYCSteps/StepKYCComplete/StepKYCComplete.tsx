import clsx from 'clsx'
import { useApprovalStatusChip } from 'components/Airdrop/hooks/useApprovalStatusChip'
import { useGetKycConfig } from 'components/Airdrop/hooks/useGetKycConfig'
import { useGetKycStatus } from 'components/Airdrop/hooks/useGetKycStatus'
import { JumioFlowContainer } from 'components/Airdrop/JumioFlowContainer/JumioFlowContainer'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CoolFish } from './CoolFish'

export default function StepKYCComplete() {
  const pollKey = usePollKey()
  const router = useRouter()

  return (
    <JumioFlowContainer className="flex">
      <div className={clsx('p-12', 'flex', 'flex-col', 'w-full')}>
        <h1 className={clsx('font-extended', 'text-4xl', 'mb-8')}>KYC Form</h1>
        <div className={clsx('flex', 'justify-center', 'mt-4', 'mb-8')}>
          <CoolFish />
        </div>
        <h2
          className={clsx('font-extended', 'text-2xl', 'mb-16', 'text-center')}
        >
          Verifying your documents...
        </h2>
        <StatusMessage key={pollKey} />
        <div className="mb-auto" />
        <div className={clsx('flex', 'justify-end')}>
          <Button
            onClick={() => {
              router.push('/dashboard')
            }}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </JumioFlowContainer>
  )
}

function usePollKey() {
  const [pollKey, setPollKey] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setPollKey(prev => prev + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  return pollKey
}

function StatusMessage() {
  const kycStatus = useGetKycStatus()
  const { response: kycConfig } = useGetKycConfig()
  const approvalStatusChip = useApprovalStatusChip({
    status: kycStatus.response?.can_attempt
      ? kycStatus.status
      : 'AIRDROP_INELIGIBLE',
    kycConfig: kycConfig,
    details: kycStatus.response?.can_attempt_reason ?? undefined,
  })

  if (['WAITING_FOR_CALLBACK' || 'IN_PROGRESS'].includes(kycStatus.status)) {
    return null
  }

  return (
    <div className={clsx('flex', 'justify-center')}>{approvalStatusChip}</div>
  )
}
