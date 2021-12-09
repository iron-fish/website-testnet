import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LoginContext } from './useLogin'
export { STATUS } from './useLogin'

interface ProtectedProps {
  ifLoggedIn?: string
  ifLoggedOut?: string
  loginContext: LoginContext
}

export function useProtectedRoute({
  ifLoggedIn,
  ifLoggedOut,
  loginContext,
}: ProtectedProps) {
  const $router = useRouter()
  // eslint-disable-next-line
  console.log({ loginContext })
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
