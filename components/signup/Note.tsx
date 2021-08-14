import { ReactNode } from 'react'

interface NoteProps {
  children: ReactNode
  size?: string
}

export const Note = ({ children, size = 'w-full' }: NoteProps) => (
  <div className={`p-2 text-sm mb-8 mt-2 bg-alertyellow text-center ${size}`}>
    {children}
  </div>
)
export default Note
