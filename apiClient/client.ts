// Client for ironfish-http-api.
import {
  ListLeaderboardResponse,
  ListEventsResponse,
  ApiUser,
  ApiError,
} from './types'

// Environment variables set in Vercel config.
const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY

// eslint-disable-next-line no-console
console.log({ API_URL, API_KEY, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_API_KEY })

export async function listLeaderboard(): Promise<
  ListLeaderboardResponse | ApiError
> {
  const res = await fetch(`${API_URL}/users?order_by=total_points`)
  return await res.json()
}

export async function getUser(userId: string): Promise<ApiUser | ApiError> {
  const res = await fetch(`${API_URL}/users/${userId}`)
  return await res.json()
}

export async function listEvents(
  userId: string
): Promise<ListEventsResponse | ApiError> {
  const res = await fetch(`${API_URL}/events?user_id=${userId}`)
  return await res.json()
}

export async function createUser(
  email: string,
  graffiti: string,
  country_code: string
): Promise<ApiUser | ApiError> {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ email, graffiti, country_code }),
  })
  return await res.json()
}
