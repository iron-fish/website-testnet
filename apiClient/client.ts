// Client for ironfish-http-api.
import { magic } from 'utils/magic'
import {
  ListLeaderboardResponse,
  ListEventsResponse,
  ApiUser,
  ApiError,
  LoginEvent,
} from './types'
import { LocalError } from './errors'

// Environment variables set in Vercel config.
const SERVER_API_URL = process.env.API_URL
const SERVER_API_KEY = process.env.API_KEY
const BROWSER_API_URL = process.env.NEXT_PUBLIC_API_URL
const BROWSER_API_KEY = process.env.NEXT_PUBLIC_API_KEY

const API_URL = SERVER_API_URL || BROWSER_API_URL
const API_KEY = SERVER_API_KEY || BROWSER_API_KEY

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
  socialChoice: string,
  social: string,
  country_code: string
): Promise<ApiUser | ApiError> {
  const body = JSON.stringify({
    email,
    graffiti,
    country_code,
    [socialChoice]: social,
  })
  // eslint-disable-next-line no-console
  console.log('body', body)
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body,
  })
  return await res.json()
}

export async function login(
  email: string
): Promise<ApiUser | ApiError | LocalError> {
  /* eslint-disable-next-line no-console */
  console.log({ magic, window })
  if (typeof window === 'undefined' || !magic) {
    return new LocalError('Only runnable in the browser', 500)
  }
  try {
    const token = await magic.auth.loginWithMagicLink({
      email,
      redirectURI: new URL('/callback', window.location.origin).href,
    })
    /* eslint-disable-next-line no-console */
    console.log('TOKEN', token)
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return res.json()
  } catch (e) {
    return new LocalError(e.message, 500)
  }
}

export async function tokenLogin(): Promise<LoginEvent | LocalError> {
  /* eslint-disable-next-line no-console */
  console.log({ magic, window })
  if (typeof window === 'undefined' || !magic) {
    return new LocalError('Only runnable in the browser', 500)
  }
  try {
    const token = await magic.auth.loginWithCredential()
    /* eslint-disable-next-line no-console */
    console.log('TOKEN', token)
    const res = await fetch(`/api/login`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    /* eslint-disable-next-line no-console */
    console.log('RES', res)
    return res.json()
  } catch (e) {
    return new LocalError(e.message, 500)
  }
}
