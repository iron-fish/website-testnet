// Client for ironfish-http-api.
import { magic, RPCError, RPCErrorCode } from 'utils/magic'
import {
  ApiUserMetadata,
  ApiError,
  ApiUser,
  GenericApiError,
  ListEventsResponse,
  PaginatedListLeaderboardResponse,
  MetricsConfigResponse,
  UserMetricsResponse,
} from './types'
import { LocalError } from './errors'
import {
  UNABLE_TO_LOGIN,
  ENDPOINT_UNAVAILABLE,
  NOT_ISOMORPHIC,
} from 'constants/errors'

export const API_URL = process.env.NEXT_PUBLIC_API_URL

type Params = {
  email: string
  graffiti: string
  socialChoice: string
  social: string
  country: string
  recaptcha: string
  github?: string
}

export async function createUser({
  email,
  graffiti,
  socialChoice,
  social,
  country: country_code,
  recaptcha,
  github,
}: Params): Promise<ApiUser | ApiError> {
  const hub = github ? { github } : {}
  const body = JSON.stringify({
    ...hub,
    email,
    graffiti,
    country_code,
    recaptcha,
    [socialChoice]: social,
  })
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
  return await res.json()
}

type PartialUser = {
  email?: string
  github?: string
  graffiti?: string
  socialChoice?: string
  social?: string
  countryCode?: string
}

export async function updateUser(id: number, partial: PartialUser) {
  const body = JSON.stringify(partial)
  const token = await magic?.user.getIdToken()
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  }
  const res = await fetch(`${API_URL}/users/${id}`, options)
  return await res.json()
}

export async function listUsers({
  search,
  country_code: countryCode,
  event_type: eventType,
  limit,
  after,
  before,
}: {
  search?: string
  country_code?: string
  event_type?: string
  limit?: number
  after?: number
  before?: number
}): Promise<PaginatedListLeaderboardResponse | ApiError> {
  const params = new URLSearchParams({
    order_by: 'rank',
  })
  if (search) {
    params.append('search', search)
  }
  if (countryCode) {
    params.append('country_code', countryCode)
  }
  if (eventType) {
    params.append('event_type', eventType)
  }
  if (after) {
    params.append('after', after.toString())
  }
  if (before) {
    params.append('before', before.toString())
  }
  if (limit) {
    params.append('limit', limit.toString())
  }

  const res = await fetch(`${API_URL}/users?${params.toString()}`)
  return await res.json()
}

// Returns the start date of the current week of the testnet.
// Each week starts on Monday at midnight UTC.
function getWeeklyStart(): Date {
  const d = new Date()

  // Days are 0-based, so Monday is 1. On Tuesday (2) we
  // want the offset to be 1, and Sunday we want the offset to be 6.
  const dayOffset = (d.getUTCDay() + 6) % 7

  d.setUTCDate(d.getUTCDate() - dayOffset)
  d.setUTCHours(0, 0, 0, 0)
  return d
}

export async function getUser(userId: string): Promise<ApiUser | ApiError> {
  const res = await fetch(`${API_URL}/users/${userId}`)
  return await res.json()
}

export async function getUserWeeklyMetrics(
  userId: string
): Promise<UserMetricsResponse | ApiError> {
  const start = getWeeklyStart()
  const end = new Date()

  const res = await fetch(
    `${API_URL}/users/${userId}/metrics?granularity=total&start=${start.toISOString()}&end=${end.toISOString()}`
  )
  return await res.json()
}

export async function getUserAllTimeMetrics(
  userId: string
): Promise<UserMetricsResponse | ApiError> {
  const res = await fetch(
    `${API_URL}/users/${userId}/metrics?granularity=lifetime`
  )
  return await res.json()
}

export async function listEvents({
  userId,
  after,
  limit,
  before,
}: {
  userId: string
  after?: string
  limit?: number
  before?: string
}): Promise<ListEventsResponse | ApiError> {
  const params = new URLSearchParams({
    user_id: userId,
    ...(after ? { after } : {}),
    ...(before ? { before } : {}),
    ...(limit ? { limit: limit.toString() } : {}),
  })
  const res = await fetch(`${API_URL}/events?${params.toString()}`)
  return await res.json()
}

export async function getMetricsConfig(): Promise<
  MetricsConfigResponse | ApiError
> {
  const res = await fetch(`${API_URL}/metrics/config`)
  return await res.json()
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function login(email: string): Promise<any> {
  if (typeof window === 'undefined' || !magic) {
    return new LocalError('Only runnable in the browser', NOT_ISOMORPHIC)
  }
  try {
    await magic.auth.loginWithMagicLink({
      email,
      redirectURI: new URL(`/callback`, window.location.origin).href,
    })
    const token = await magic.user.getIdToken()
    const auth = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (auth) {
      return { statusCode: 200, loaded: true }
    }
  } catch (err) {
    if (err instanceof RPCError) {
      switch (err.code) {
        case RPCErrorCode.MagicLinkFailedVerification:
          return new LocalError('MagicLinkFailedVerification', UNABLE_TO_LOGIN)
        case RPCErrorCode.MagicLinkExpired:
          return new LocalError('MagicLinkExpired', UNABLE_TO_LOGIN)
        case RPCErrorCode.MagicLinkRateLimited:
          return new LocalError('MagicLinkRateLimited', UNABLE_TO_LOGIN)
        case RPCErrorCode.UserAlreadyLoggedIn:
          return new LocalError('UserAlreadyLoggedIn', UNABLE_TO_LOGIN)
        default:
          break
      }
    }

    return new LocalError((err as Error).message, UNABLE_TO_LOGIN)
  }
}

export async function getUserDetails(
  token?: string
): Promise<ApiUserMetadata | ApiError | LocalError> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}/me`, {
      headers,
      credentials: 'include',
    })

    const data = await response.json()

    if (response.status !== 200) {
      data.statusCode = response.status
      data.error = data.code
    }

    return data
  } catch (e) {
    return new LocalError((e as Error).message, ENDPOINT_UNAVAILABLE)
  }
}

export const isGenericError = (
  x: Record<string, unknown>
): x is GenericApiError => {
  const { statusCode } = x
  return typeof statusCode === 'number' && statusCode > 400
}
