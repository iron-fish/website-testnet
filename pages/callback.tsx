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
          $router.push(`/signup?toast=${btoa('Please sign up.')}`)
        } else if ($error === 'user_unconfirmed') {
          $router.push(`/login?toast=${btoa('Please log in.')}`)
        }
        return
      }
      if ($token) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const token = await magic!.auth.loginWithCredential()
        if (token === null) {
          throw new Error('Null token')
        }
        const details = await getUserDetails(token)
        if ('statusCode' in details && details.statusCode !== 200) {
          $router.push(`/signup?toast=${btoa('Please sign up.')}`)
          return
        }
        $router.push(`/leaderboard?toast=${btoa('Welcome back!')}`)
      }
    }
    call()
  }, [$router, $error, $token])
  return <Loader />
}

export default Callback
