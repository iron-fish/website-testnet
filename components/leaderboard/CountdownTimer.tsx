import { useEffect, useState } from 'react'
import { CustomBox } from 'components/OffsetBorder'
import { intervalToDuration } from 'date-fns'
import type { Duration } from 'date-fns'

import { formatEventDate } from 'utils/events'
import clsx from 'clsx'

const customFormatDuration = (x: Duration) =>
  `${x.days ? x.days + 'd : ' : ''}${x.hours ? x.hours + 'hr : ' : ''}${
    x.minutes ? x.minutes + 'min : ' : ''
  }${x.seconds ? x.seconds + 'sec' : '0sec'}`

type CountdownTimerProps = {
  end: Date
  event: string
}
const CountdownTimer = (props: CountdownTimerProps) => {
  const { end, event } = props
  const now = new Date()
  const [$time, $setTime] = useState(now)
  useEffect(() => {
    const i = setInterval(() => $setTime(new Date()), 1000)
    return () => clearInterval(i)
  }, [])
  const ii = intervalToDuration({ start: $time, end })
  return now > end ? (
    <></>
  ) : (
    <div
      className="w-full flex flex-col justify-center items-center text-center"
      title={`Next week starts: ${formatEventDate(end)}`}
    >
      <CustomBox
        behind="bg-white"
        rounded
        size="2"
        className={clsx('w-[18.25rem]', 'mt-4')}
        background="bg-ifpink"
      >
        <div className="w-[18.25rem] px-4 py-2 m-auto">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">{customFormatDuration(ii)}</span>
            <span className="uppercase text-sm">{event}</span>
          </div>
        </div>
      </CustomBox>
    </div>
  )
}
export default CountdownTimer
