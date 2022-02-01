import { useEffect, useState } from 'react'
import { Box } from 'components/OffsetBorder/Box'
import { intervalToDuration, nextMonday, set } from 'date-fns'
import type { Duration } from 'date-fns'

const customFormatDuration = (x: Duration) =>
  `${x.days ? x.days + 'd : ' : ''}${x.hours ? x.hours + 'hr : ' : ''}${
    x.minutes ? x.minutes + 'min : ' : ''
  }${x.seconds ? x.seconds + 'sec' : '0sec'}`

const CountdownTimer = () => {
  const now = new Date()
  const [$time, $setTime] = useState(now)
  const end = nextMonday(
    set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
  )
  useEffect(() => {
    const i = setInterval(() => $setTime(new Date()), 3e3)
    return () => clearInterval(i)
  }, [])
  const ii = intervalToDuration({ start: $time, end })
  return (
    <div className="w-full flex flex-col justify-center items-center text-center">
      <Box className="w-[18.25rem]" background="bg-ifpink">
        <div className="w-[18.25rem] px-4 py-2 m-auto">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">{customFormatDuration(ii)}</span>
            <span className="uppercase text-sm text-ifmauve">
              Until Weekly Rollover
            </span>
          </div>
        </div>
      </Box>
    </div>
  )
}
export default CountdownTimer
