import { ReactNode } from 'react'

export type GenericCardProps = {
  title: string
  top?: string
  bottom?: string
  bottomUnit?: string
  showInfo?: boolean
  info?: string
  verticalOffset?: string
  useRank?: boolean
  subline?: ReactNode
}
export default GenericCardProps
