import { useEffect } from 'react'
import Router from 'next/router'
import { useLogin } from './useLogin'

export function useProtectedRoute({
  ifLoggedIn,
  ifLoggedOut,
}: {
  ifLoggedIn?: string
  ifLoggedOut?: string
}) {
  const { checkLoggedIn } = useLogin()
  useEffect(() => {
    if (checkLoggedIn() && ifLoggedIn) {
      Router.push(ifLoggedIn)
    }
    if (!checkLoggedIn() && ifLoggedOut) {
      Router.push(ifLoggedOut)
    }
  }, [checkLoggedIn, ifLoggedIn, ifLoggedOut])
}

export default useProtectedRoute
