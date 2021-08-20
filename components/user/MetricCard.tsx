import React from 'react'
import { Box as OffsetBorderBox } from 'components/OffsetBorder'

type MetricCardProp = {
  title: string
  value: string
  subValueTop: string
  subValueBottom: string
}

export default function MetricCard({
  title,
  value,
  subValueTop,
  subValueBottom,
}: MetricCardProp) {
  return (
    <OffsetBorderBox>
      <div
        className="font-extended p-8"
        style={{ minWidth: 288, maxWidth: 288 }}
      >
        <div className=" mb-4 whitespace-nowrap">{title}</div>
        <div className="flex gap-4">
          <div className="text-5xl">{value}</div>
          <div className="font-favorit mt-1">
            <div className="leading-tight">{subValueTop}</div>
            <div className="text-ifsubtextgray leading-tight whitespace-nowrap	">
              {subValueBottom}
            </div>
          </div>
        </div>
      </div>
    </OffsetBorderBox>
  )
}
