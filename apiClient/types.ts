export type ApiEventMetadata = {
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

export type ApiEvent = {
  id: number
  created_at: string
  updated_at: string
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
}

export type ApiError = {
  statusCode: number
  message: ReadonlyArray<string>
  error: string
}

export type ListEventsResponse = {
  data: ReadonlyArray<ApiEvent>
  metadata: {
    has_next: boolean
    has_previous: boolean
  }
}

export type ListLeaderboardResponse = {
  data: ReadonlyArray<ApiUser>
}

export type UserMetric = {
  count: number
  points: number
  rank?: number
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
  total_points: number
  country_code: string
  email_notifications: boolean
  last_login_at: string
  discord: string
  telegram: string
  statusCode?: number
  message?: string
}
