import { useEffect, useState } from 'react'
import { CustomBox } from 'components/OffsetBorder'
import { intervalToDuration } from 'date-fns'
import type { Duration } from 'date-fns'

import { nextMondayFrom } from 'utils/date'
import { formatEventDate } from 'utils/events'

const customFormatDuration = (x: Duration) =>
  `${x.days ? x.days + 'd : ' : ''}${x.hours ? x.hours + 'hr : ' : ''}${
    x.minutes ? x.minutes + 'min : ' : ''
  }${x.seconds ? x.seconds + 'sec' : '0sec'}`

const CountdownTimer = () => {
  const now = new Date()
  const [$time, $setTime] = useState(now)
  const end = nextMondayFrom(now)
  useEffect(() => {
    const i = setInterval(() => $setTime(new Date()), 1000)
    return () => clearInterval(i)
  }, [])
  const ii = intervalToDuration({ start: $time, end })
  return (
    <div
      className="w-full flex flex-col justify-center items-center text-center"
      title={`Next week starts: ${formatEventDate(end)}`}
    >
      <CustomBox
        behind="bg-white"
        rounded
        size="2"
        className="w-[18.25rem]"
        background="bg-ifpink"
      >
        <div className="w-[18.25rem] px-4 py-2 m-auto">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">{customFormatDuration(ii)}</span>
            <span className="uppercase text-sm text-ifmauve">
              Until Weekly Rollover
            </span>
          </div>
        </div>
      </CustomBox>
    </div>
  )
}
export default CountdownTimer
