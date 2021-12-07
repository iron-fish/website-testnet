import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LoginAware } from './useLogin'
export { STATUS } from './useLogin'

interface ProtectedProps {
  ifLoggedIn?: string
  ifLoggedOut?: string
  loginContext: LoginAware
}

export function useProtectedRoute({
  ifLoggedIn,
  ifLoggedOut,
  loginContext,
}: ProtectedProps) {
  const $router = useRouter()
  const { checkLoggedIn } = loginContext
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
  return loginContext
}

export default useProtectedRoute
