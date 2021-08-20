import styles from './index.module.css'
import { Props } from './types'

export function Box({
  style = {},
  className = '',
  backgroundClassName = '',
  container = false,
  children,
  animated = false,
}: Props) {
  const classAnimated = animated ? styles.animated : ''
  return (
    <div
      className={`relative mb-2.5 ${
        container ? `ml-2.5` : ``
      } mr-2.5 ${classAnimated}`}
    >
      <div
        className={`absolute border border-black top-2.5 -bottom-2.5 left-2.5 -right-2.5 ${backgroundClassName} ${classAnimated}`}
        style={style}
      />
      <div
        className={`relative border border-black bg-white ${className} ${classAnimated}`}
        style={style}
      >
        {children}
      </div>
    </div>
  )
}

export default Box
