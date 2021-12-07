import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { magic } from 'utils/magic'
import Loader from 'components/Loader'
import { encode as btoa } from 'base-64'
import { LoginAware, STATUS } from 'hooks/useLogin'

type LogoutProps = {
  loginContext: LoginAware
}

export default function Logout({ loginContext }: LogoutProps) {
  const $router = useRouter()
  useEffect(() => {
    const sayGoodbye = async () => {
      // eslint-disable-next-line no-console
      console.log('logging out')
      if (magic && magic.user && magic.user.logout) {
        return magic.user.logout().then(async result => {
          // eslint-disable-next-line no-console
          console.log('logged out?', result)
          loginContext.setStatus(STATUS.NOT_FOUND)
          loginContext.setError(null)
          // eslint-disable-next-line
          const loggedIn = await magic!.user!.isLoggedIn()
          // eslint-disable-next-line no-console
          console.log({ loggedIn, result })
          const goto = `/login?toast=${btoa('You have been logged out.')}`
          return $router.push(goto)
        })
      } else {
        return Promise.reject(false)
      }
    }
    sayGoodbye()
  }, [$router, loginContext])
  return <Loader />
}
