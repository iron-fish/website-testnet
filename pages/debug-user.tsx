import { useProtectedRoute } from 'hooks/useProtectedRoute'
import { useState, useEffect } from 'react'
import Debug from 'components/Debug'
import { PageProps } from 'components/page-types'

const Test = ({ loginContext }: PageProps) => {
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
