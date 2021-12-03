import { useEffect } from 'react'
import { magic } from 'utils/magic'
import Router from 'next/router'
import Loader from 'components/Loader'
import { encode as btoa } from 'base-64'

export default function Logout() {
  useEffect(() => {
    const sayGoodbye = async () => {
      if (!magic) return false
      await magic.user.logout()
      Router.push(
        (await magic.user.isLoggedIn())
          ? `/leaderboard`
          : `/login?toast=${btoa('You have been logged out.')}`
      )
    }
    sayGoodbye()
  }, [])
  return <Loader />
}
