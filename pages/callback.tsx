import { magic } from 'utils/magic'
import { useEffect } from 'react'
import Router from 'next/router'
import Loader from 'components/Loader'
import { getUserDetails } from 'apiClient/client'
import { useQuery } from 'hooks/useQuery'

const Callback = () => {
  const $error = useQuery('error')
  const $token = useQuery('magic_credential')
  useEffect(() => {
    const call = async () => {
      if ($error) {
        if ($error === 'user_invalid') {
          // btoa('Please sign up.')
          Router.push(`/signup?toast=UGxlYXNlIHNpZ24gdXAu`)
        } else if ($error === 'user_unconfirmed') {
          // btoa('Please log in.')
          Router.push('/login?toast=UGxlYXNlIGxvZyBpbi4=')
        }
        return
      }
      if ($token) {
        const token = await magic!.auth.loginWithCredential()
        if (token === null) {
          throw new Error('Null token')
        }
        const deets = await getUserDetails(token)
        if ('statusCode' in deets && deets.statusCode !== 200) {
          // eslint-disable-next-line
          console.warn('something not so good?', { deets })
          return
        }
        Router.push(`/leaderboard?toast=V2VsY29tZSBiYWNrIQ`)
      }
    }
    call()
  }, [$error, $token])
  return <Loader />
}

export default Callback
