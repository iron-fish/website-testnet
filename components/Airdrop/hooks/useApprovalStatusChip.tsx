import { format } from 'date-fns'
import { useMemo } from 'react'
import { InfoChip } from '../InfoChip/InfoChip'
import { getNextEligiblePhase } from './usePhaseStatus'
import type { KycConfig, KycStatus } from '../types/JumioTypes'
import { titlesByPhase } from '../RewardItem/RewardItem'

export function useApprovalStatusChip({
  status,
  kycConfig,
  attempts,
  maxAttempts,
  ineligibleReason,
}: {
  status: KycStatus | 'NOT_STARTED' | 'AIRDROP_INELIGIBLE'
  kycConfig: KycConfig | null
  attempts?: number
  maxAttempts?: number
  ineligibleReason?: string
}) {
  return useMemo(() => {
    if (status === 'AIRDROP_INELIGIBLE') {
      return (
        <InfoChip variant="warning">
          Airdrop Unavailable{!!ineligibleReason && `: ${ineligibleReason}`}
        </InfoChip>
      )
    }

    const nextEligiblePhase = getNextEligiblePhase(kycConfig)

    if (!nextEligiblePhase) {
      return <InfoChip variant="warning">Airdrop Ended</InfoChip>
    }

    if (status === 'SUCCESS') {
      return <InfoChip variant="complete">KYC Approved</InfoChip>
    }

    if (status === 'WAITING_FOR_CALLBACK') {
      return <InfoChip variant="pending">KYC Processing</InfoChip>
    }

    if (status === 'SUBMITTED') {
      return (
        <InfoChip variant="pending">
          Waiting for Iron Fish to review your KYC 👍
        </InfoChip>
      )
    }

    if (status === 'IN_PROGRESS') {
      return <InfoChip variant="warning">KYC Incomplete</InfoChip>
    }

    if (status === 'FAILED') {
      return <InfoChip variant="warning">KYC Declined</InfoChip>
    }

    const nextPhaseDeadline = format(
      new Date(nextEligiblePhase.kyc_completed_by),
      'MMM d'
    )

    if (status === 'TRY_AGAIN') {
      return (
        <InfoChip variant="warning">
          KYC Failed, try again before {nextPhaseDeadline}
        </InfoChip>
      )
    }

    return (
      <InfoChip variant={'warning'}>
        KYC Deadline for {titlesByPhase[nextEligiblePhase.name]}:{' '}
        {nextPhaseDeadline}
      </InfoChip>
    )
  }, [attempts, maxAttempts, status, kycConfig, ineligibleReason])
}
