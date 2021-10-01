import { useEffect } from 'react'
import Router from 'next/router'
import { useLogin } from './useLogin'

export function useProtectedRoute({
  onLoggedIn,
  onLoggedOut,
}: {
  onLoggedIn?: string
  onLoggedOut?: string
}) {
  const { checkLoggedIn } = useLogin()
  useEffect(() => {
    if (checkLoggedIn() && onLoggedIn) {
      Router.push(onLoggedIn)
    }
    if (!checkLoggedIn() && onLoggedOut) {
      Router.push(onLoggedOut)
    }
  }, [checkLoggedIn, onLoggedIn, onLoggedOut])
}
