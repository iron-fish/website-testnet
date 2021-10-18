import { useEffect } from 'react'
import Router from 'next/router'
import Loader from 'components/Loader'
import { getUserDetails } from 'apiClient/client'
import { useQuery } from 'hooks/useQuery'

const Callback = () => {
  const $error = useQuery('error')
  const $token = useQuery('magic_credential')
  // eslint-disable-next-line
  console.log({ $error, $token })
  useEffect(() => {
    const call = async () => {
      if ($error) {
        if ($error === 'user_invalid') {
          Router.push(`/signup?toast=Please+sign+up.`)
        } else if ($error === 'user_unconfirmed') {
          Router.push('/login?toast=Please+log+in.')
        }
        return
      }
      if ($token) {
        // eslint-disable-next-line
        console.log({ $token })
        const deets = await getUserDetails($token)
        if ('statusCode' in deets && deets.statusCode !== 200) {
          // eslint-disable-next-line
          console.warn('something not so good?', { deets })
          return
        }
        // eslint-disable-next-line
        console.log({ deets })
        debugger
        Router.push(
          `/leaderboard?toast=Welcome+back+${Object.keys(deets).join(' ')}`
        )
      }
    }
    call()
  }, [$error, $token])
  return <Loader />
}

export default Callback
