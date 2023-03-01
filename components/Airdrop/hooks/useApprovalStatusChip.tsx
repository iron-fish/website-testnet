import { format } from 'date-fns'
import { useMemo } from 'react'
import { InfoChip } from '../InfoChip/InfoChip'
import { getNextEligiblePhase } from './usePhaseStatus'

export function useApprovalStatusChip(isVerified: boolean) {
  const content = useMemo(() => {
    const nextEligiblePhase = getNextEligiblePhase()

    if (isVerified) {
      return 'KYC Form Approved'
    }

    if (nextEligiblePhase) {
      return `KYC Deadline for ${nextEligiblePhase.label}: ${format(
        nextEligiblePhase.kycDeadline,
        'MMM d'
      )}`
    }
    return 'Airdrop Ended'
  }, [isVerified])

  return (
    <InfoChip variant={isVerified ? 'complete' : 'warning'}>{content}</InfoChip>
  )
}
