import { useState, useEffect } from 'react'
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

export function useLogin() {
  const [$status, $setStatus] = useState<STATUS>(STATUS.LOADING)
  const [$error, $setError] = useState<ApiError | LocalError | null>(null)
  const [$magicMetadata, $setMagicMetadata] =
    useState<MagicUserMetadata | null>(null)
  const [$metadata, $setMetadata] = useState<ApiUserMetadata | null>(null)

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // if we're already loaded, quit
        if ($status === STATUS.LOADED) return
        if (!magic || !magic.user || !magic.user.logout) {
          return
        }

        let token
        try {
          token = await magic.user.getIdToken()
        } catch (error) {}

        if (!token) {
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
          $setStatus(STATUS.FAILED)
          // this is a visible error and a breaking error
          $setError(details)
          Promise.reject(details)
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
      try {
        checkLoggedIn()
      } catch (e) {
        if ($status === STATUS.LOADING) {
          $setStatus(STATUS.FAILED)
        }
        // eslint-disable-next-line no-console
        console.warn('general error!', e)
      }
    }
  }, [$metadata, $setMetadata, $status])

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

export default useLogin
