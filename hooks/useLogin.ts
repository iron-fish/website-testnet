import { useState, useEffect } from 'react'
import Router from 'next/router'
import { magic, MagicUserMetadata } from 'utils/magic'
import { ApiUserMetadata, ApiError, LocalError } from 'apiClient'
import { getUserDetails } from 'apiClient/client'

// reusable magic login context
// MagicUserMetadata takes the form of:
// {issuer, publicAddress, email}
// https://github.com/magiclabs/magic-js/blob/master/packages/%40magic-sdk/types/src/modules/user-types.ts#L17-L21

// const $metadata = useLogin('/go-somewhere-if-it-does-not-work')
export function useLogin(redirect?: string) {
  const [$error, $setError] = useState<ApiError | LocalError | null>(null)
  const [$magicMetadata, $setMagicMetadata] =
    useState<MagicUserMetadata | null>(null)
  const [$metadata, $setMetadata] = useState<ApiUserMetadata | null>(null)
  // ts hates useEffect(async () => {})
  useEffect(() => {
    const checkLoggedIn = async () => {
      if ($metadata || !magic || !magic.user) return

      const token = await magic.user.getIdToken()
      // eslint-disable-next-line
      console.log({ token })
      if (token) {
        const mmeta = await magic.user.getMetadata()
        $setMagicMetadata(mmeta)
        const details = await getUserDetails(token)
        // eslint-disable-next-line
        console.log({ token, details, mmeta })
        if ('error' in details) {
          $setError(details)
        }
      } else if (typeof redirect === 'string') {
        // if redirect string is provided and we're not logged in, cya!
        Router.push(redirect)
      }
      // ts is fine with this
      if (!$metadata) checkLoggedIn()
    }
  }, [$metadata, $setMetadata, redirect])

  return { metadata: $metadata, magicMetadata: $magicMetadata, error: $error }
}

export default useLogin
