import { useEffect } from 'react'
import Router from 'next/router'
import Loader from '../components/Loader'
import { magic } from '../utils/magic'

const Callback = () => {
  useEffect(() => {
    if (magic && 'auth' in magic) {
      magic.auth.loginWithCredential().then(async (token: string | null) => {
        try {
          const res = await fetch('api/login', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          if (res.status === 200) {
            Router.push('/')
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
