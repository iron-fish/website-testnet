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
  const { checkLoggedIn, status, metadata, magicMetadata } = useLogin({
    redirect,
    timeout,
  })
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
  return { status, metadata, magicMetadata }
}

export default useProtectedRoute
