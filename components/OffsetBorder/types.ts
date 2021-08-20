import CSS from 'csstype'

export type Props = {
  container?: boolean
  style?: CSS.Properties
  className?: string
  backgroundClassName?: string
  children?: React.ReactNode
  animated?: boolean
}
