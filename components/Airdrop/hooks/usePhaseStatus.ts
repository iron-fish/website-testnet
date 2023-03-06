import { isFuture } from 'date-fns'
import { KycConfig, KycConfigPool } from '../types/JumioTypes'

export function getNextEligiblePhase(
  config: KycConfig | null
): KycConfigPool | null {
  if (!config) {
    return null
  }

  const nextPhaseEntry = config.data.find(({ kyc_completed_by }) => {
    return isFuture(new Date(kyc_completed_by))
  })

  return nextPhaseEntry ?? null
}
