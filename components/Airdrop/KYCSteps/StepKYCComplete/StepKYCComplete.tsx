import clsx from 'clsx'
import { useApprovalStatusChip } from 'components/Airdrop/hooks/useApprovalStatusChip'
import { useGetKycConfig } from 'components/Airdrop/hooks/useGetKycConfig'
import { useGetKycStatus } from 'components/Airdrop/hooks/useGetKycStatus'
import { JumioFlowContainer } from 'components/Airdrop/JumioFlowContainer/JumioFlowContainer'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import { CoolFish } from './CoolFish'

export default function StepKYCComplete() {
  const router = useRouter()

  const { response, status, loading } = useGetKycStatus(4000)
  const { response: kycConfig } = useGetKycConfig()

  const approvalStatusChip = useApprovalStatusChip({
    status: response?.can_attempt ? status : 'AIRDROP_INELIGIBLE',
    kycConfig: kycConfig,
    details: response?.can_attempt_reason ?? undefined,
    helpUrl: response?.help_url ?? undefined,
  })

  const isStatusPending =
    loading || ['WAITING_FOR_CALLBACK', 'IN_PROGRESS'].includes(status)

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
          {isStatusPending
            ? 'Verifying your documents...'
            : 'Verification complete'}
        </h2>
        {isStatusPending ? null : (
          <div className={clsx('flex', 'justify-center')}>
            {approvalStatusChip}
          </div>
        )}
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
