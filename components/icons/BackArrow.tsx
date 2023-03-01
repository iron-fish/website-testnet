import * as React from 'react'

export default function BackArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none">
      <path fill="#FFC2EB" stroke="#000" d="M3.7 28.3V.5h27.8v27.8z" />
      <path fill="#FFC2EB" stroke="#000" d="M.5 31.5V3.7h27.8v27.8z" />
      <path
        stroke="#000"
        strokeWidth={1.067}
        d="M23.2 17.467H6.534m7.999 5.6-8.266-5.6 8.266-5.6"
      />
    </svg>
  )
}
