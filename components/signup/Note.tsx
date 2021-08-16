import { ReactNode } from 'react'

interface NoteProps {
  children: ReactNode
  size?: string
  className?: string
}

export const Note = ({
  children,
  size = 'w-full',
  className = '',
}: NoteProps) => (
  <div
    className={`p-2 max-w-sm text-sm mt-2 bg-alertyellow text-center ${size} ${className}`}
  >
    {children}
  </div>
)
export default Note
