import { useEffect } from 'react'
import Router from 'next/router'
import Loader from '../components/Loader'
import { magic } from '../utils/magic'

const Callback = () => {
  useEffect(() => {
    if (magic && 'auth' in magic) {
      magic.auth.loginWithCredential().then(async (token: string | null) => {
        try {
          /* eslint-disable-next-line no-console */
          console.log({ token })
          const res = await fetch('api/login', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          /* eslint-disable-next-line no-console */
          console.log({ res })
          if (res.status === 200) {
            Router.push('/')
            return
          }
        } catch (e) {
          throw e
        }
      })
    }
  }, [])
  return <Loader />
}

export default Callback
