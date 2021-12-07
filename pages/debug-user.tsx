import { useProtectedRoute } from 'hooks/useProtectedRoute'
import { useState, useEffect } from 'react'
import Debug from 'components/Debug'
import { LoginAware } from 'hooks/useLogin'

type UserDebugProps = {
  loginContext: LoginAware
}

const Test = ({ loginContext }: UserDebugProps) => {
  // eslint-disable-next-line
  const [$time, $setTime] = useState<number>(Date.now())
  const [$elapsed, $setElapsed] = useState<number>(0)
  const details = useProtectedRoute({ loginContext })
  const { checkLoggedIn } = details
  useEffect(() => {
    if (checkLoggedIn()) {
      $setElapsed(Math.abs($time - Date.now()))
    }
  }, [checkLoggedIn, $elapsed, $time])
  return <Debug {...details} elapsed={$elapsed} />
}

export default Test
