// Client for ironfish-http-api.

// Environment variables set in Vercel config.
const API_URL = process.env.API_URL;

export type ApiEvent = {
  id: number;
  created_at: string;
  updated_at: string;
  type: EventType;
  occurred_at: string;
  points: number;
  user_id: number;
}

export type ApiUser = {
  id: number;
  country_code: string;
  graffiti: string;
  total_points: number;
  last_login_at: null | number;
  rank: number;
}

export enum EventType {
  BLOCK_MINED = 'BLOCK_MINED',
  BUG_CAUGHT = 'BUG_CAUGHT',
  COMMUNITY_CONTRIBUTION = 'COMMUNITY_CONTRIBUTION',
  PULL_REQUEST_MERGED = 'PULL_REQUEST_MERGED',
  SOCIAL_MEDIA_PROMOTION = 'SOCIAL_MEDIA_PROMOTION',
}

type ApiError = {
  statusCode: number;
  message: ReadonlyArray<string>;
  error: string;
}
  
type ListEventsResponse = {
  data: ReadonlyArray<ApiEvent>
}

type ListLeaderboardResponse = {
  data: ReadonlyArray<ApiUser>
}

export type UserMetricsResponse = {
  user_id: number,
  granularity: 'lifetime' | 'total',
  points: number,
  metrics: {
    blocks_mined: number,
    bugs_caught: number,
    community_contributions: number,
    pull_requests_merged: number,
    social_media_contributions: number
  }
}

export type MetricsConfigResponse = {
  points_per_category: {
    [key in EventType]: number
  },
  weekly_limits: {
    [key in EventType]: number
  }
}

export async function listLeaderboard(): Promise<ListLeaderboardResponse | ApiError> {
  const res = await fetch(`${API_URL}/users?order_by=total_points`)
  return await res.json()
}

export async function getUser(userId: string): Promise<ApiUser | ApiError> {
  const res = await fetch(`${API_URL}/users/${userId}`)
  return await res.json()
}

export async function getUserWeeklyMetrics(userId: string): Promise<UserMetricsResponse | ApiError> {
  const start = new Date()
  const end = new Date()
  start.setDate(end.getDate() - 7)

  const res = await fetch(`${API_URL}/users/${userId}/metrics?granularity=total&start=${start.toISOString()}&end=${end.toISOString()}`)
  return await res.json()
}

export async function getUserAllTimeMetrics(userId: string): Promise<UserMetricsResponse | ApiError> {
  const res = await fetch(`${API_URL}/users/${userId}/metrics?granularity=lifetime`)
  return await res.json()
}

export async function listEvents(userId: string): Promise<ListEventsResponse | ApiError> {
  const res = await fetch(`${API_URL}/events?user_id=${userId}`)
  return await res.json()
}

export async function getMetricsConfig(): Promise<MetricsConfigResponse | ApiError> {
  const res = await fetch(`${API_URL}/metrics/config`)
  return await res.json()
}

