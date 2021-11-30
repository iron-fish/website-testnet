import { useProtectedRoute, STATUS } from 'hooks/useProtectedRoute'
import { useState, useEffect } from 'react'
import Debug from 'components/Debug'

const Test = () => {
  // eslint-disable-next-line
  const [$time, $setTime] = useState<number>(Date.now())
  const [$elapsed, $setElapsed] = useState<number>(0)
  const deets = useProtectedRoute({})
  useEffect(() => {
    if (deets.status === STATUS.LOADED) {
      $setElapsed(Math.abs($time - Date.now()))
    }
  }, [deets.status, $elapsed, $time])
  return (
    <Debug
      {...deets}
      style={{
        backgroundColor: deets.status === STATUS.LOADED ? 'lime' : 'red',
      }}
      elapsed={$elapsed}
    />
  )
}

export default Test
