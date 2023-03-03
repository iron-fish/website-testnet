import { format } from 'date-fns'
import { useMemo } from 'react'
import { InfoChip } from '../InfoChip/InfoChip'
import { getNextEligiblePhase } from './usePhaseStatus'
import type { KycStatus } from '../types/JumioTypes'

export function useApprovalStatusChip(status: KycStatus | 'NOT_STARTED') {
  return useMemo(() => {
    const nextEligiblePhase = getNextEligiblePhase()

    if (!nextEligiblePhase) {
      return <InfoChip variant="warning">Airdrop Ended</InfoChip>
    }

    if (status === 'SUCCESS') {
      return <InfoChip variant="complete">KYC Approved</InfoChip>
    }

    if (status === 'SUBMITTED') {
      return <InfoChip variant="pending">KYC Processing</InfoChip>
    }

    if (status === 'IN_PROGRESS') {
      return <InfoChip variant="warning">KYC Incomplete</InfoChip>
    }

    if (status === 'FAILED') {
      return <InfoChip variant="warning">KYC Declined</InfoChip>
    }

    const nextPhaseDeadline = format(nextEligiblePhase.kycDeadline, 'MMM d')

    if (status === 'TRY_AGAIN') {
      return (
        <InfoChip variant="warning">
          KYC Failed, try again before {nextPhaseDeadline}
        </InfoChip>
      )
    }

    return (
      <InfoChip variant={'warning'}>
        KYC Deadline for {nextEligiblePhase.label}: {nextPhaseDeadline}
      </InfoChip>
    )
  }, [status])
}
