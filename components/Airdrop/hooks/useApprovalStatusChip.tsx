import { format } from 'date-fns'
import { useMemo } from 'react'
import { InfoChip } from '../InfoChip/InfoChip'
import { getNextEligiblePhase } from './usePhaseStatus'
import type { KycConfig, KycStatus } from '../types/JumioTypes'
import { titlesByPhase } from '../RewardItem/RewardItem'

function withDetails(message: string, details?: string) {
  if (!details) {
    return message
  }

  return `${message}: ${details}`
}

export function useApprovalStatusChip({
  status,
  kycConfig,
  details,
}: {
  status: KycStatus | 'NOT_STARTED' | 'AIRDROP_INELIGIBLE'
  kycConfig: KycConfig | null
  details?: string
}) {
  return useMemo(() => {
    if (status === 'AIRDROP_INELIGIBLE') {
      return (
        <InfoChip align="left" variant="warning" wrap>
          {withDetails('Airdrop Unavailable', details)}
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
      return (
        <InfoChip variant="warning">
          {withDetails('KYC Declined', details)}
        </InfoChip>
      )
    }

    const nextPhaseDeadline = format(
      new Date(nextEligiblePhase.kyc_completed_by),
      'MMM d'
    )

    if (status === 'TRY_AGAIN') {
      return (
        <InfoChip variant="warning">
          {withDetails(
            `KYC Failed, try again before ${nextPhaseDeadline}`,
            details
          )}
        </InfoChip>
      )
    }

    return (
      <InfoChip variant={'warning'}>
        KYC Deadline for {titlesByPhase[nextEligiblePhase.name]}:{' '}
        {nextPhaseDeadline}
      </InfoChip>
    )
  }, [status, kycConfig, details])
}
