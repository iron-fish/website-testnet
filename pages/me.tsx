import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { encode as btoa } from 'base-64'
import Loader from 'components/Loader'

import { Props, User } from './users/[id]'
const NOT_YET_SET = '-1'

export function Me({ loginContext }: Props) {
  const $router = useRouter()
  const [$id, $setId] = useState(NOT_YET_SET)
  useEffect(() => {
    if (!$router.isReady) return
    const id = loginContext?.metadata?.id
    if (!id) {
      $router.push(
        `/login?toast=${btoa('You must be logged in to see that page.')}`
      )
    } else {
      $setId(id.toString())
    }
  }, [$router, $router?.isReady, loginContext?.metadata?.id])
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
