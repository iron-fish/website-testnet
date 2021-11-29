import { useState, useEffect, useCallback } from 'react'
import Router from 'next/router'
import { magic, MagicUserMetadata } from 'utils/magic'
import { ApiUserMetadata, ApiError, LocalError } from 'apiClient'
import { getUserDetails } from 'apiClient/client'

export enum STATUS {
  LOADING = 'loading',
  FAILED = 'failed',
  LOADED = 'loaded',
  FORCED = 'forced',
}

// reusable magic login context
// MagicUserMetadata takes the form of:
// {issuer, publicAddress, email}
// https://github.com/magiclabs/magic-js/blob/master/packages/%40magic-sdk/types/src/modules/user-types.ts#L17-L21

// const $metadata = useLogin('/go-somewhere-if-it-does-not-work')

export interface LoginProps {
  redirect?: string
  timeout?: number
}
export function useLogin(config: LoginProps = {}) {
  const { redirect, timeout = -1 } = config
  const [$status, $setStatus] = useState<STATUS>(STATUS.LOADING)
  const [$error, $setError] = useState<ApiError | LocalError | null>(null)
  const [$magicMetadata, $setMagicMetadata] =
    useState<MagicUserMetadata | null>(null)
  const [$metadata, $setMetadata] = useState<ApiUserMetadata | null>(null)
  useEffect(() => {
    const checkLoggedIn = async () => {
      // eslint-disable-next-line no-console
      console.log('starting check!')
      // this is likely a case where we're working in not-the-browser
      if ($metadata || !magic || !magic.user) return

      // check if we're logged in and fetch token with one call
      // magic.user.isLoggedIn makes this same call anyway
      let token
      try {
        token = await magic.user.getIdToken()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('error getting id', err)
        throw err
      }

      if (token) {
        const [magicMd, details] = await Promise.all([
          magic.user.getMetadata(),
          getUserDetails(token),
        ])
        // eslint-disable-next-line no-console
        console.log('has token!', token)

        if ('error' in details || details instanceof LocalError) {
          // eslint-disable-next-line no-console
          console.log('error!', details)
          $setStatus(STATUS.FAILED)
          $setError(details)
        } else {
          // eslint-disable-next-line no-console
          console.log('loaded!', details)
          $setStatus(STATUS.LOADED)
          $setMetadata(details)
          $setMagicMetadata(magicMd)
        }
      } else if (typeof redirect === 'string') {
        // eslint-disable-next-line no-console
        console.log('redirecting...')
        // if redirect string is provided and we're not logged in, cya!
        Router.push(redirect)
      }
    }
    // ts is fine with this
    if (!$metadata) {
      try {
        checkLoggedIn()
      } catch (e) {
        $setStatus(STATUS.LOADED)
        // eslint-disable-next-line no-console
        console.warn('general error!', e)
      }
    }
  }, [$metadata, $setMetadata, redirect])
  useEffect(() => {
    const forceStatus = () => {
      if ($status === STATUS.LOADING) {
        // eslint-disable-next-line no-console
        console.log('FORCING STATUS')
        $setStatus(STATUS.FORCED)
      }
    }
    if (timeout > -1) {
      const tId = setTimeout(forceStatus, timeout)
      return () => clearTimeout(tId)
    }
  }, [$status, $setStatus, timeout])

  const loginContext = {
    checkLoggedIn: useCallback(() => $status === STATUS.LOADED, [$status]),
    error: $error,
    magicMetadata: $magicMetadata,
    metadata: $metadata,
    status: $status,
    setStatus: $setStatus,
  }
  return loginContext
}

export default useLogin
