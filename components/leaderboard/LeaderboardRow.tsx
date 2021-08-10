import React from 'react'
import Link from 'next/link'

import FishAvatar from './FishAvatar'

const fishAvatarColors = [
  '#FFAFAF',
  '#94ED6B',
  '#A3E9FF',
  '#7657CE',
  '#E7B453',
  '#54FF17',
  '#1D4423',
  '#D46161',
  '#AFF1FF',
  '#F1CB00',
]

// djb2 (xor)
function getColor(graffiti: string): string {
  let hash = 5381

  for (let i = 0; i < graffiti.length; i++) {
    hash = (hash * 33) ^ graffiti.charCodeAt(i)
  }

  return fishAvatarColors[(hash >>> 0) % fishAvatarColors.length]
}

// From https://stackoverflow.com/a/13627586
function ordinalSuffix(num: number): string {
  const j = num % 10
  const k = num % 100

  if (j === 1 && k !== 11) {
    return `${num}st`
  }
  if (j == 2 && k != 12) {
    return `${num}nd`
  }
  if (j == 3 && k != 13) {
    return `${num}rd`
  }
  return `${num}th`
}

type Props = {
  id: number
  rank: number
  graffiti: string
  points: number
}

function LeaderboardRow({ id, rank, graffiti, points }: Props) {
  const avatarColor = getColor(graffiti)
  console.error(avatarColor)
  const rankStr = ordinalSuffix(rank)
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
