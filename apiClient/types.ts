import { Alpha3Code } from 'iso-3166-1-ts'
export type ApiEvent = {
  id: number
  created_at: string
  updated_at: string
  type: string
  occurred_at: string
  points: number
  user_id: number
}
export type LoginEvent = {
  authenticated: boolean
}

export type ApiUser = {
  graffiti: string
  id: number
  email: string
  country_code: Alpha3Code
  discord_username?: string
  telegram_username?: string
  created_at: string
  updated_at: string
  total_points: number
}

export type ApiError = {
  statusCode: number
  message: ReadonlyArray<string>
  error: string
}

export type ListEventsResponse = {
  data: ReadonlyArray<ApiEvent>
}

export type ListLeaderboardResponse = {
  data: ReadonlyArray<ApiUser>
}
