import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { encode as btoa } from 'base-64'
import Loader from 'components/Loader'

import { Props, User } from './users/[id]'
const NOT_YET_SET = '-1'

export function Me({ loginContext }: Props) {
  const $router = useRouter()
  const { checkFailed, checkLoggedIn, checkLoading } = loginContext
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(loginContext, null, 2))
  const [$id, $setId] = useState(NOT_YET_SET)
  useEffect(() => {
    let count = 0
    // eslint-disable-next-line
    let checkId: NodeJS.Timeout
    if (!$router.isReady) return
    const check = () => {
      if (count >= 10) {
        clearInterval(checkId)
        $router.push(
          `/login?toast=${btoa('You must be logged in to see that page.')}`
        )
        return
      } else {
        count += 1
      }
      const loggedIn = checkLoggedIn()
      const loading = checkLoading()
      const failed = checkFailed()
      // eslint-disable-next-line no-console
      console.log({ loggedIn, loading, failed })
      if ((loggedIn || failed) && !loading) {
        if (loggedIn) {
          const id = loginContext?.metadata?.id
          if (id) {
            // eslint-disable-next-line no-console
            console.log('I AM LOGGED IN', id)
            $setId(id.toString())
            clearInterval(checkId)
          } else {
            // eslint-disable-next-line no-console
            console.log('I AM NOT LOGGED IN')
            $router.push(
              `/login?toast=${btoa('You must be logged in to see that page.')}`
            )
          }
        }
      }
    }
    checkId = setInterval(check, 100)
    return () => clearInterval(checkId)
  }, [
    $router,
    $router?.isReady,
    loginContext?.metadata?.id,
    checkLoggedIn,
    checkLoading,
    checkFailed,
  ])
  // eslint-disable-next-line no-console
  console.log({
    loginContext,
    $id,
  })
  return $id === NOT_YET_SET ? (
    <Loader />
  ) : (
    <User loginContext={loginContext} startTab="settings" id={$id} />
  )
}

export default Me
