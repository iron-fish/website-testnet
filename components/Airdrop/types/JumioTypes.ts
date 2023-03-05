export type KycStatus =
  | 'IN_PROGRESS'
  | 'WAITING_FOR_CALLBACK'
  | 'TRY_AGAIN'
  | 'FAILED'
  | 'SUBMITTED'
  | 'SUCCESS'

export type JumioWorkflow = {
  can_attempt: boolean
  can_attempt_reason: string
  can_create: boolean
  can_create_reason: string
  jumio_account_id: string
  jumio_web_href: string
  jumio_workflow_execution_id: string
  kyc_attempts: number
  kyc_max_attempts: number
  kyc_status: KycStatus
  public_address: string
  redemption_id: number
  user_id: number
}
