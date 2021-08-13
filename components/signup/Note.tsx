import { ReactNode } from 'react'

interface NoteProps {
  children: ReactNode
  size?: string
}

export const Note = ({ children, size = 'w-11/12 sm:w-7/12' }: NoteProps) => (
  <div className={`p-2 text-sm mb-8 bg-statusyellow text-center ${size}`}>
    {children}
  </div>
)
export default Note
