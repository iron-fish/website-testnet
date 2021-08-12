import React from 'react'

type Props = {
  children?: React.ReactNode
}

function OffsetBorderContainer({ children }: Props) {
  return (
    <div className="relative mb-2.5 mr-2.5">
      <div className="absolute border border-black top-2.5 -bottom-2.5 left-2.5 -right-2.5" />

      <div className="relative border border-black bg-white">{children}</div>
    </div>
  )
}

export default OffsetBorderContainer
