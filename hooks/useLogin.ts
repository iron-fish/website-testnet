import { useState, useEffect } from 'react'
import Router from 'next/router'
import { magic, MagicUserMetadata } from 'utils/magic'

// reusable magic login context
// MagicUserMetadata takes the form of:
// {issuer, publicAddress, email}
// https://github.com/magiclabs/magic-js/blob/master/packages/%40magic-sdk/types/src/modules/user-types.ts#L17-L21

// const $metadata = useLogin('/go-somewhere-if-it-does-not-work')
export function useLogin(redirect?: string) {
  const [$metadata, $setMetadata] = useState<MagicUserMetadata | null>(null)
  // ts hates useEffect(async () => {})
  useEffect(() => {
    const checkLoggedIn = async () => {
      // this is likely a case where we're working in not-the-browser
      if (!magic || !magic.user) return

      const loggedIn = await magic.user.isLoggedIn()
      if (loggedIn) {
        $setMetadata(await magic.user.getMetadata())
      } else if (typeof redirect === 'string') {
        // if redirect string is provided and we're not logged in, cya!
        Router.push(redirect)
      }
    }
    // ts is fine with this
    checkLoggedIn()
  }, [$metadata, $setMetadata, redirect])

  return $metadata
}

export default useLogin
