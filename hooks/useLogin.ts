import { useState, useEffect, useCallback } from 'react'
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

  const reloadUser = useCallback(async () => {
    if (!magic || !magic.user) {
      return false
    }
    $setStatus(STATUS.LOADING)

    let token
    try {
      token = await magic.user.getIdToken()
    } catch (error) {}

    const jwtToken = getCookie('ironfish_jwt')
    if (jwtToken !== '') {
      const details = await getUserDetails()
      if (
        !(details instanceof LocalError) &&
        !('error' in details) &&
        details.statusCode &&
        details.statusCode === 200
      ) {
        $setStatus(STATUS.LOADED)
        $setMetadata(details)
        return true
      }
    }

    if (!token) {
      if (redirect) {
        // if redirect string is provided and we're not logged in, cya!
        // if this is kept as a static Router.push, it _does not_ work
        $router.push(redirect)
        return false
      }

      // this is a visible error but not a breaking error
      $setStatus(STATUS.NOT_FOUND)
      $setError(new LocalError('No token available.', NO_MAGIC_TOKEN))
      return false
    }
    try {
      const [magicMd, details] = await Promise.all([
        magic.user.getMetadata(),
        getUserDetails(token),
      ])

      if ('error' in details || details instanceof LocalError) {
        // this is a visible error and a breaking error
        $setStatus(STATUS.FAILED)
        $setError(details)
        Promise.reject(details)
        return false
      }

      if (details.statusCode && details.statusCode === 401) {
        $setStatus(STATUS.NOT_FOUND)
        $setError(new LocalError('No user found.', NO_MAGIC_USER))
        return false
      }

      $setStatus(STATUS.LOADED)
      $setMetadata(details)
      $setMagicMetadata(magicMd)
      return true
    } catch (err) {
      if (err.toString().indexOf('-32603') > -1) {
        $setStatus(STATUS.NOT_FOUND)
        return false
      }

      throw err
    }
  }, [$router, redirect])
  useEffect(() => {
    const loadAndCheck = async () => {
      try {
        await reloadUser()
      } catch (e) {
        $setStatus(STATUS.FAILED)
      }
    }
    loadAndCheck()
  }, [reloadUser])
  const statusRelevantContext = (x: STATUS) => () => $status === x
  const loginContext = {
    reloadUser,
    checkLoggedIn: statusRelevantContext(STATUS.LOADED),
    checkLoading: statusRelevantContext(STATUS.LOADING),
    checkFailed: statusRelevantContext(STATUS.FAILED),
    setError: $setError,
    error: $error,
    magicMetadata: $magicMetadata,
    metadata: $metadata,
    status: $status,
    setStatus: $setStatus,
    setRawMetadata: $setMetadata,
  }
  return loginContext
}

function getCookie(name: string) {
  return (
    document.cookie
      .split(/;\s?/)
      .find(item => item.startsWith(`${name}=`))
      ?.slice(name.length + 1) ?? ''
  )
}

export type LoginContext = ReturnType<typeof useLogin>

export default useLogin
