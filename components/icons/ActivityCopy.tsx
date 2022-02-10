import React from 'react'

type ActivityProps = {
  className: string
}

function ActivityCopy({ className = '' }: ActivityProps) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0.5H2C1.45 0.5 1 0.95 1 1.5V8.5H2V1.5H8V0.5ZM9.5 2.5H4C3.45 2.5 3 2.95 3 3.5V10.5C3 11.05 3.45 11.5 4 11.5H9.5C10.05 11.5 10.5 11.05 10.5 10.5V3.5C10.5 2.95 10.05 2.5 9.5 2.5ZM9.5 10.5H4V3.5H9.5V10.5Z"
        fill="#7F7F7F"
      />
    </svg>
  )
}

export default ActivityCopy
