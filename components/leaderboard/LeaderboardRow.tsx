import React from 'react'
import Link from 'next/link'

import FishAvatar from './FishAvatar'
import { graffitiToColor, numberToOrdinal } from 'utils'

type Props = {
  id: number
  rank: number
  graffiti: string
  points: number
}

function LeaderboardRow({ id, rank, graffiti, points }: Props) {
  const avatarColor = graffitiToColor(graffiti)
  const rankStr = numberToOrdinal(rank)
  const pointsStr = points.toLocaleString()

  return (
    <div
      className="bg-white border border-black rounded flex items-center px-10"
      style={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.19)' }}
    >
      <div className="font-extended text-2xl w-24">{rankStr}</div>
      <div className="flex flex-1 items-center font-extended text-2xl">
        <div className="py-3 mr-5">
          <FishAvatar color={avatarColor} />
        </div>
        <Link href={`/users/${id}`}>
          <a>
            <div>{graffiti}</div>
          </a>
        </Link>
      </div>
      <div className="font-extended text-2xl">{pointsStr}</div>
    </div>
  )
}

export default LeaderboardRow
