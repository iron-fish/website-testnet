import { isFuture } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

export const PHASE_DATES = {
  0: {
    label: 'Open Source',
    kycDeadline: zonedTimeToUtc('2023-03-13 12:00:00', 'PST'),
    airdropDate: zonedTimeToUtc('2023-03-16 12:00:00', 'PST'),
  },
  1: {
    label: 'Phase 1',
    kycDeadline: zonedTimeToUtc('2023-03-19 12:00:00', 'PST'),
    airdropDate: zonedTimeToUtc('2023-03-23 12:00:00', 'PST'),
  },
  2: {
    label: 'Phase 2',
    kycDeadline: zonedTimeToUtc('2023-03-26 12:00:00', 'PST'),
    airdropDate: zonedTimeToUtc('2023-03-30 12:00:00', 'PST'),
  },
  3: {
    label: 'Phase 3',
    kycDeadline: zonedTimeToUtc('2023-03-26 12:00:00', 'PST'),
    airdropDate: zonedTimeToUtc('2023-04-06 12:00:00', 'PST'),
  },
} as const

type PhaseTypes = keyof typeof PHASE_DATES

export function getNextEligiblePhase() {
  const nextPhaseEntry = Object.entries(PHASE_DATES).find(
    ([_phase, { kycDeadline }]) => {
      return isFuture(kycDeadline)
    }
  )

  if (!nextPhaseEntry) {
    return null
  }

  return {
    phase: parseInt(nextPhaseEntry[0]) as PhaseTypes,
    ...nextPhaseEntry[1],
  }
}

export function usePhaseStatus(phase: PhaseTypes, kycCompletedAt: Date | null) {
  return { phase, kycCompletedAt }
}
