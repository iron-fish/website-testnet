export type ApiEventMetadataBlockMined = {
  difficulty: number
  graffiti: string
  hash: string
  id: number
  main: boolean
  object: string
  previous_block_hash: string
  sequence: number
  size: number
  time_since_last_block_ms: number
  transactions_count: number
}

export type ApiEventMetadataWithLink = {
  url: string
}

export type ApiEventMetadataTransactionSent = {
  transaction_hash: string
  block_hash: string
}

export type ApiEventMetadata =
  | ApiEventMetadataWithLink
  | ApiEventMetadataBlockMined
  | ApiEventMetadataTransactionSent

export type ApiEvent = {
  id: number
  type: EventType
  occurred_at: string
  points: number
  user_id: number
  metadata?: ApiEventMetadata
}
export type LoginEvent = {
  authenticated: boolean
}

export type ApiUser = {
  country_code: string
  graffiti: string
  id: number
  created_at: Date
  last_login_at: null | number
  rank: number
  total_points: number
}
export enum EventType {
  BLOCK_MINED = 'BLOCK_MINED',
  BUG_CAUGHT = 'BUG_CAUGHT',
  COMMUNITY_CONTRIBUTION = 'COMMUNITY_CONTRIBUTION',
  PULL_REQUEST_MERGED = 'PULL_REQUEST_MERGED',
  SOCIAL_MEDIA_PROMOTION = 'SOCIAL_MEDIA_PROMOTION',
  NODE_HOSTED = 'NODE_UPTIME',
  TRANSACTION_SENT = 'SEND_TRANSACTION',
  MULTI_ASSET_TRANSFER = 'MULTI_ASSET_TRANSFER',
  MULTI_ASSET_BURN = 'MULTI_ASSET_BURN',
  MULTI_ASSET_MINT = 'MULTI_ASSET_MINT',
}

export type ApiError = {
  statusCode: number
  message: ReadonlyArray<string>
  error: string
}

export interface Pagination {
  has_next: boolean
  has_previous: boolean
}

export type ListEventsResponse = {
  data: ReadonlyArray<ApiEvent>
  metadata: Pagination
}

export interface ListLeaderboardResponse {
  data: ReadonlyArray<ApiUser>
}

export interface PaginatedListLeaderboardResponse
  extends ListLeaderboardResponse {
  metadata: Pagination
}

export type UserMetric = {
  count: number
  points: number
  rank?: number
}

export type TimeData = {
  last_checked_in?: number
  total_hours: number
}

export type UserMetricsResponse = {
  user_id: number
  granularity: 'lifetime' | 'total'
  points: number
  metrics: {
    blocks_mined: UserMetric
    bugs_caught: UserMetric
    community_contributions: UserMetric
    pull_requests_merged: UserMetric
    social_media_contributions: UserMetric
    send_transaction: UserMetric
    node_uptime: UserMetric
    multi_asset_burn: UserMetric
    multi_asset_mint: UserMetric
    multi_asset_transfer: UserMetric
  }
  node_uptime: TimeData
  pools: {
    main: UserMetric
    code: UserMetric
  }
}

export type MetricsConfigResponse = {
  points_per_category: {
    [key in EventType]: number
  }
  weekly_limits: {
    [key in EventType]: number
  }
}

export type ApiUserMetadata = {
  id: number
  created_at: string
  updated_at: string
  email: string
  graffiti: string
  github: string
  total_points: number
  country_code: string
  email_notifications: boolean
  last_login_at: string
  discord: string
  telegram: string
  statusCode?: number
  message?: string
}

export type GenericApiError = {
  statusCode?: number
}
