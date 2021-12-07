import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from 'components/Loader'
import { encode as btoa } from 'base-64'
import { LoginAware } from 'hooks/useLogin'

type LogoutProps = {
  loginContext: LoginAware
}

export default function Logout({ loginContext }: LogoutProps) {
  const $router = useRouter()
  useEffect(() => {
    const sayGoodbye = async () => {
      // eslint-disable-next-line no-console
      console.log('logging out')
      loginContext.logout().then(async () => {
        // eslint-disable-next-line no-console
        console.log('logged out?')
        // const loggedIn = await magic.user.isLoggedIn()
        const goto = `/login?toast=${btoa('You have been logged out.')}`
        return $router.push(goto)
      })
    }
    sayGoodbye()
  }, [$router, loginContext])
  return <Loader />
}
