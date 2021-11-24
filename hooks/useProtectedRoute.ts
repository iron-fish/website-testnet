import { useEffect } from 'react'
import Router from 'next/router'
import { useLogin } from './useLogin'
export { STATUS } from './useLogin'

export function useProtectedRoute({
  ifLoggedIn,
  ifLoggedOut,
}: {
  ifLoggedIn?: string
  ifLoggedOut?: string
}) {
  const { checkLoggedIn, status } = useLogin()
  useEffect(() => {
    const check = async () => {
      const loggedIn = await checkLoggedIn()
      if (loggedIn && ifLoggedIn) {
        Router.push(ifLoggedIn)
      }
      if (!loggedIn && ifLoggedOut) {
        Router.push(ifLoggedOut)
      }
    }
    check()
  }, [checkLoggedIn, ifLoggedIn, ifLoggedOut])
  return { status }
}

export default useProtectedRoute
