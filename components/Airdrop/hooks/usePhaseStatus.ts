const PHASE_DATES = {
  0: {
    kycDeadline: new Date('2023-03-13'),
    airdopDate: new Date('2023-03-16'),
  },
  1: {
    kycDeadline: new Date('2023-03-19'),
    airdopDate: new Date('2023-03-23'),
  },
  2: {
    kycDeadline: new Date('2023-03-26'),
    airdopDate: new Date('2023-03-30'),
  },
  3: {
    kycDeadline: new Date('2023-03-26'),
    airdopDate: new Date('2023-04-06'),
  },
} as const

type PhaseTypes = keyof typeof PHASE_DATES

export function usePhaseStatus(phase: PhaseTypes, kycCompletedAt: Date | null) {
  return { phase, kycCompletedAt }
}
