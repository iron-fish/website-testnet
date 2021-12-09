import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { magic } from 'utils/magic'
import Loader from 'components/Loader'
import { encode as btoa } from 'base-64'
import { LoginContext, STATUS } from 'hooks/useLogin'

type LogoutProps = {
  loginContext: LoginContext
}

export default function Logout({ loginContext }: LogoutProps) {
  const $router = useRouter()
  useEffect(() => {
    const sayGoodbye = async () => {
      await magic?.user?.logout()
      loginContext.setStatus(STATUS.NOT_FOUND)
      loginContext.setError(null)
      $router.push(`/login?toast=${btoa('You have been logged out.')}`)
    }
    sayGoodbye()
  }, [$router, loginContext])
  return <Loader />
}
