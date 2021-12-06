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
      // hunch: we're losing context between now and the Router.push
      // eslint-disable-next-line no-console
      console.log({ loggedIn, useProtectedRoute: true })
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
