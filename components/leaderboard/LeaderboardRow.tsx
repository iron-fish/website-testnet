import React from 'react'

import FishAvatar from './FishAvatar'
import { graffitiToColor, numberToOrdinal } from 'utils'

type Props = {
  rank: number
  graffiti: string
  points: number
}

function LeaderboardRow({ rank, graffiti, points = 0 }: Props) {
  const avatarColor = graffitiToColor(graffiti)
  const rankStr = numberToOrdinal(rank)
  const pointsStr = points.toLocaleString()

        return (

  <div>

    {/* Large screens  */}
        <div className="hidden md:flex relative bg-white rounded items-center px-10" style={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.19)' }}>
              <div className="absolute inset-0 rounded border hover:border-2 border-black" />
              <div className="font-extended text-2xl w-24">{rankStr}</div>
              <div className="flex flex-1 items-center font-extended text-2xl">
                <div className="py-3 mr-5">
                  <FishAvatar color={avatarColor} />
                </div>
                <div>{graffiti}</div>
              </div>
              <div className="font-extended text-2xl">{pointsStr}</div>

        </div>

    {/* Mobile screens */}

    <div className="md:hidden flex relative bg-white rounded items-center px-6" style={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.19)' }}>
        <div>
            <div className="flex items-stretch justify-between mb-1" style={{ width: '100%' }}>
                <div>
                  <div className="relative text-xs mt-6 text-ifsubtextgray tracking-widest"> USERNAME </div>
                  <h1 className="font-extended text-xl mt-0 break-all">
                    {graffiti}
                  </h1>
                </div>

                <div className="absolute top-5 right-5">
                    <FishAvatar color={avatarColor}/>
                </div>
            </div>

            <div className="flex font-favorit  gap-x-16 gap-y-2 mb-5">
                <div>
                  <div className="text-xs mt-2 text-ifsubtextgray tracking-widest"> RANK </div>
                  <h1 className="font-extended text-xl mt-0 break-all">
                    {rankStr}
                  </h1>
                </div>

                <div>
                  <div className="text-xs mt-2 text-ifsubtextgray tracking-widest"> TOTAL POINTS </div>
                  <h1 className="font-extended text-xl mt-0 break-all">
                    {pointsStr}
                  </h1>
                </div>
            </div>
        </div>
    </div>


</div>
  )

}

export default LeaderboardRow
