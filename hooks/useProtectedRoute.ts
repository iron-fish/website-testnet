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
    const check = checkLoggedIn()
    if (check && onLoggedIn) {
      Router.push(onLoggedIn)
    }
    if (!check && onLoggedOut) {
      Router.push(onLoggedOut)
    }
  }, [checkLoggedIn, onLoggedIn, onLoggedOut])
}
