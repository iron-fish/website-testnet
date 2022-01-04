import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { magic, MagicUserMetadata } from 'utils/magic'
import { ApiUserMetadata, ApiError, LocalError } from 'apiClient'
import { getUserDetails } from 'apiClient/client'
import {
  // NO_MAGIC_INSTANCE,
  NO_MAGIC_USER,
  NO_MAGIC_TOKEN,
} from 'constants/errors'
// import { encode as btoa } from 'base-64'

export enum STATUS {
  LOADING = 'loading',
  FAILED = 'failed',
  NOT_FOUND = 'not_found',
  LOADED = 'loaded',
  LOGGED_OUT = 'logged_out',
  FORCED = 'forced',
}

// reusable magic login context
// MagicUserMetadata takes the form of:
// {issuer, publicAddress, email}
// https://github.com/magiclabs/magic-js/blob/master/packages/%40magic-sdk/types/src/modules/user-types.ts#L17-L21

// const $metadata = useLogin({redirect: '/go-somewhere-if-it-does-not-work'})

export interface LoginProps {
  redirect?: string
}

export function useLogin(config: LoginProps = {}) {
  const $router = useRouter()
  const { redirect } = config
  const [$status, $setStatus] = useState<STATUS>(STATUS.LOADING)
  const [$error, $setError] = useState<ApiError | LocalError | null>(null)
  const [$magicMetadata, $setMagicMetadata] =
    useState<MagicUserMetadata | null>(null)
  const [$metadata, $setMetadata] = useState<ApiUserMetadata | null>(null)

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        if ($status === STATUS.LOADED) return

        if (!magic) {
          return
        }

        let token
        try {
          token = await magic.user.getIdToken()
        } catch (error) {}

        if (!token) {
          if (redirect) {
            // if redirect string is provided and we're not logged in, cya!
            // if this is kept as a static Router.push, it _does not_ work
            $router.push(redirect)
            return
          }

          // this is a visible error but not a breaking error
          $setStatus(STATUS.NOT_FOUND)
          $setError(new LocalError('No token available.', NO_MAGIC_TOKEN))
          return
        }
        const [magicMd, details] = await Promise.all([
          magic.user.getMetadata(),
          getUserDetails(token),
        ])

        if ('error' in details || details instanceof LocalError) {
          // this is a visible error and a breaking error
          $setStatus(STATUS.FAILED)
          $setError(details)
          return
        }

        if (details.statusCode && details.statusCode === 401) {
          $setStatus(STATUS.NOT_FOUND)
          $setError(new LocalError('No user found.', NO_MAGIC_USER))
          return
        }

        $setStatus(STATUS.LOADED)
        $setMetadata(details)
        $setMagicMetadata(magicMd)
      } catch (err) {
        if (err.toString().indexOf('-32603') > -1) {
          $setStatus(STATUS.NOT_FOUND)
          return
        }

        throw err
      }
    }

    if (!$metadata) {
      checkLoggedIn().catch(e => {
        if ($status === STATUS.LOADING) {
          $setStatus(STATUS.FAILED)
        }

        // eslint-disable-next-line no-console
        console.warn('general error!', e)
      })
    }
  }, [$metadata, $setMetadata, redirect, $status, $router])

  const statusRelevantContext = (x: STATUS) => () => $status === x
  const loginContext = {
    checkLoggedIn: statusRelevantContext(STATUS.LOADED),
    checkLoading: statusRelevantContext(STATUS.LOADING),
    checkFailed: statusRelevantContext(STATUS.FAILED),
    setError: $setError,
    error: $error,
    magicMetadata: $magicMetadata,
    metadata: $metadata,
    status: $status,
    setStatus: $setStatus,
  }
  return loginContext
}

export type LoginContext = ReturnType<typeof useLogin>

export const useLocalLogin = () => ({
  checkLoggedIn: () => true,
  checkLoading: () => false,
  checkFailed: () => false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setError: () => {},
  error: '',
  status: STATUS.LOADED,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setStatus: () => {},
  metadata: {
    id: 111,
    created_at: '2021-10-30T23:28:59.505Z',
    updated_at: '2021-10-30T23:43:28.555Z',
    email: 'cooldev@ironfish.network',
    graffiti: 'cooldev',
    total_points: 1100,
    country_code: 'USA',
    email_notifications: false,
    last_login_at: '2021-10-30T23:29:49.101Z',
    discord: 'coolcooldev',
    telegram: '',
    confirmation_token: '01FNSJW53E9J029SKXYA2020KN',
    confirmed_at: '2021-10-30T23:43:28.554Z',
    github: '',
  },
  magicMetadata: {
    issuer: 'did:ethr:0xFfcD8602De681449Fa70C304096a84e014Fa123C',
    publicAddress: '0xFfcD8602De681449Fa70C304096a84e014Fa123C',
    email: 'cooldev@ironfish.network',
    isMfaEnabled: false,
    phoneNumber: null,
  },
})

export default useLogin
