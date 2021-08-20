import { useState, useEffect } from 'react'
import Router from 'next/router'
import { magic, MagicUserMetadata } from 'utils/magic'

export function useLogin(redirect?: string) {
  const [$metadata, $setMetadata] = useState<MagicUserMetadata | null>(null)
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!magic || !magic.user) return
      const loggedIn = await magic.user.isLoggedIn()
      if (loggedIn) {
        const meta = await magic.user.getMetadata()
        $setMetadata(meta)
      } else if (typeof redirect === 'string') {
        Router.push(redirect)
      }
    }
    checkLoggedIn()
  }, [$metadata, $setMetadata, redirect])
  return $metadata
}

export default useLogin
