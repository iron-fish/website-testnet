import { useEffect } from 'react'
import { magic } from 'utils/magic'
import { useRouter } from 'next/router'
import Loader from 'components/Loader'
import { encode as btoa } from 'base-64'

export default function Logout() {
  const $router = useRouter()
  useEffect(() => {
    const sayGoodbye = async () => {
      if (!magic || !magic.user) {
        return false
      }
      magic.user.logout().then(async () => {
        if (magic && magic.user && magic.user.isLoggedIn) {
          const loggedIn = await magic.user.isLoggedIn()
          const goto = loggedIn
            ? `/leaderboard`
            : `/login?toast=${btoa('You have been logged out.')}`
          // eslint-disable-next-line no-console
          console.log({ loggedIn, goto })
          return $router.push(goto)
        }
        return false
      })
    }
    sayGoodbye()
  }, [$router])
  return <Loader />
}
