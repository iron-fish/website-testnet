import { useEffect } from 'react'
// import { useRouter } from 'next/router'
import Router from 'next/router'
import { magic } from 'utils/magic'
import Loader from 'components/Loader'
import { encode as btoa } from 'base-64'
import { LoginContext, STATUS } from 'hooks/useLogin'

type LogoutProps = {
  loginContext: LoginContext
}

export default function Logout({ loginContext }: LogoutProps) {
  useEffect(() => {
    const sayGoodbye = async () => {
      // eslint-disable-next-line no-console
      console.log('logging out')
      return magic?.user.logout().then(async result => {
        // eslint-disable-next-line no-console
        console.log('logged out?', result)
        loginContext.setStatus(STATUS.NOT_FOUND)
        loginContext.setError(null)
        // eslint-disable-next-line
        await magic!.user!.isLoggedIn()
        const goto = `/login?toast=${btoa('You have been logged out.')}`
        return Router.push(goto)
      })
    }
    sayGoodbye()
  }, [loginContext])
  return <Loader />
}
