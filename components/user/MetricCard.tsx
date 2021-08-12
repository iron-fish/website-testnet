import React from 'react'
import OffsetBorderContainer from '../OffsetBorderContainer'

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
    <OffsetBorderContainer>
      <div className="p-8" style={{ minWidth: 288, maxWidth: 288 }}>
        <div className="font-extended mb-4 whitespace-nowrap">{title}</div>
        <div className="flex gap-4">
          <div className="font-extended text-5xl">{value}</div>
          <div className="mt-1">
            <div className="font-favorit leading-tight">{subValueTop}</div>
            <div className="font-favorit text-ifsubtextgray leading-tight whitespace-nowrap	">
              {subValueBottom}
            </div>
          </div>
        </div>
      </div>
    </OffsetBorderContainer>
  )
}
