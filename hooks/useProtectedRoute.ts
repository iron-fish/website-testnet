import { useEffect } from 'react'
import { useRouter } from 'next/router'
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
  const $router = useRouter()
  const loginState = useLogin({
    redirect,
    timeout,
  })
  const { checkLoggedIn } = loginState
  useEffect(() => {
    const check = () => {
      const loggedIn = checkLoggedIn()
      if (loggedIn && ifLoggedIn) {
        $router.push(ifLoggedIn)
      }
      if (!loggedIn && ifLoggedOut) {
        $router.push(ifLoggedOut)
      }
    }
    check()
  }, [$router, checkLoggedIn, ifLoggedIn, ifLoggedOut])
  return loginState
}

export default useProtectedRoute
