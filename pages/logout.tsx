import { useEffect } from 'react'
import Router from 'next/router'
import { magic } from 'utils/magic'
import Loader from 'components/Loader'
import { encode as btoa } from 'base-64'
import { LoginContext, STATUS } from 'hooks/useLogin'
import { logout } from 'apiClient/client'

type LogoutProps = {
  loginContext: LoginContext
}

export default function Logout({ loginContext }: LogoutProps) {
  useEffect(() => {
    const sayGoodbye = async () => {
      let loggedOut
      try {
        loggedOut = await magic?.user.logout()
      } catch (error) {}

      if (!loggedOut) {
        loggedOut = await logout()
      }

      if (loggedOut) {
        loginContext.setStatus(STATUS.NOT_FOUND)
        loginContext.setError(null)
        await magic?.user.isLoggedIn()
        const goto = `/login?toast=${btoa('You have been logged out.')}`
        return Router.push(goto)
      }
    }
    sayGoodbye()
  }, [loginContext])
  return <Loader />
}
