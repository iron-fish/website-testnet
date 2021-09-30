import { useEffect } from 'react'
import { magic } from 'utils/magic'
import Router from 'next/router'
import Loader from 'components/Loader'

export default function Logout() {
  useEffect(() => {
    const sayGoodbye = async () => {
      if (!magic) return false
      await magic.user.logout()
      Router.push(
        (await magic.user.isLoggedIn())
          ? new URL('/leaderboard', window.location.origin).href
          : new URL('/login', window.location.origin).href
      )
    }
    sayGoodbye()
  }, [])
  return <Loader />
}
