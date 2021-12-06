import { useEffect } from 'react'
import Router from 'next/router'
import { useLogin, LoginProps } from './useLogin'
export { STATUS } from './useLogin'

interface ProtectedProps extends LoginProps {
  ifLoggedIn?: string
  ifLoggedOut?: string
}

export function useProtectedRoute({
  ifLoggedIn,
  ifLoggedOut,
  redirect = '',
  timeout = -1,
}: ProtectedProps) {
  const loginState = useLogin({
    redirect,
    timeout,
  })
  const { checkLoggedIn } = loginState
  useEffect(() => {
    const check = () => {
      const loggedIn = checkLoggedIn()
      if (loggedIn && ifLoggedIn) {
        Router.push(ifLoggedIn)
      }
      if (!loggedIn && ifLoggedOut) {
        Router.push(ifLoggedOut)
      }
    }
    check()
  }, [checkLoggedIn, ifLoggedIn, ifLoggedOut])
  return loginState
}

export default useProtectedRoute
