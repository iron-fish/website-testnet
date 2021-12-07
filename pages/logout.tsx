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
      // eslint-disable-next-line no-console
      console.log('logging out')
      magic.user.logout().then(async () => {
        // eslint-disable-next-line no-console
        console.log('logged out?')
        // const loggedIn = await magic.user.isLoggedIn()
        const goto = `/login?toast=${btoa('You have been logged out.')}`
        return $router.push(goto)
      })
    }
    sayGoodbye()
  }, [$router])
  return <Loader />
}
