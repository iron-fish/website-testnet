import { useState, useEffect } from 'react'
import Router from 'next/router'
import { magic, MagicUserMetadata } from 'utils/magic'
import { ApiUserMetadata, ApiError, LocalError } from 'apiClient'
import { getUserDetails } from 'apiClient/client'

export enum STATUS {
  LOADING = 'loading',
  FAILED = 'failed',
  LOADED = 'loaded',
}

// reusable magic login context
// MagicUserMetadata takes the form of:
// {issuer, publicAddress, email}
// https://github.com/magiclabs/magic-js/blob/master/packages/%40magic-sdk/types/src/modules/user-types.ts#L17-L21

// const $metadata = useLogin('/go-somewhere-if-it-does-not-work')
export function useLogin(redirect?: string) {
  const [$status, $setStatus] = useState<STATUS>(STATUS.LOADING)
  const [$error, $setError] = useState<ApiError | LocalError | null>(null)
  const [$magicMetadata, $setMagicMetadata] =
    useState<MagicUserMetadata | null>(null)
  const [$metadata, $setMetadata] = useState<ApiUserMetadata | null>(null)
  // ts hates useEffect(async () => {})
  useEffect(() => {
    const checkLoggedIn = async () => {
      // this is likely a case where we're working in not-the-browser
      if ($metadata || !magic || !magic.user) return

      // check if we're logged in and fetch token with one call
      // magic.user.isLoggedIn makes this same call anyway
      let token
      try {
        token = await magic.user.getIdToken()
      } catch (err) {
        return
      }

      if (token) {
        const [magicMd, details] = await Promise.all([
          magic.user.getMetadata(),
          getUserDetails(token),
        ])

        $setMagicMetadata(magicMd)
        if ('error' in details || details instanceof LocalError) {
          $setStatus(STATUS.FAILED)
          $setError(details)
        } else {
          $setStatus(STATUS.LOADED)
          $setMetadata(details)
        }
      } else if (typeof redirect === 'string') {
        // if redirect string is provided and we're not logged in, cya!
        Router.push(redirect)
      }
    }
    // ts is fine with this
    if (!$metadata) checkLoggedIn()
  }, [$metadata, $setMetadata, redirect])
  return {
    checkLoggedIn: () => $status === STATUS.LOADED,
    error: $error,
    magicMetadata: $magicMetadata,
    metadata: $metadata,
    status: $status,
  }
}

export default useLogin
