import { magic } from 'utils/magic'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from 'components/Loader'
import { getUserDetails } from 'apiClient/client'
import { useQuery } from 'hooks/useQuery'
import { encode as btoa } from 'base-64'

const Callback = () => {
  const $router = useRouter()
  const $error = useQuery('error')
  const $token = useQuery('magic_credential')
  useEffect(() => {
    const call = async () => {
      if ($error) {
        if ($error === 'user_invalid') {
          $router.push(`/login?toast=${btoa(`Invalid user`)}&persist=true`)
          return
        } else if ($error === 'user_unconfirmed') {
          $router.push(`/login?toast=${btoa('Please log in.')}`)
        }
        return
      }
      if ($token) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const token = await magic!.auth.loginWithCredential()
        if (token === null) {
          $router.push(
            `/login?toast=${btoa(`Auth token is empty.`)}&persist=true`
          )
          return
        }
        const details = await getUserDetails(token)

        if ('email' in details && details.email.length > 0) {
          $router.push(`/dashboard?toast=${btoa('Welcome back!')}`)
          return
        }

        $router.push(`/login?toast=${btoa(`${details.message}`)}&persist=true`)
      }
    }
    call()
  }, [$router, $error, $token])
  return <Loader />
}

export default Callback
