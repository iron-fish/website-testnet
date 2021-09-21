import { Props } from './types'

export function Box({
  className = '',
  container = false,
  children,
  background = 'bg-white',
  behind = 'bg-transparent',
}: Props) {
  return (
    <div
      className={`relative mb-2.5 ${
        container ? `ml-2.5` : ``
      } mr-2.5 ${className}`}
    >
      <div
        className={`absolute border border-black top-2.5 -bottom-2.5 left-2.5 -right-2.5 ${behind}`}
      />
      <div className={`relative border border-black ${background}`}>
        {children}
      </div>
    </div>
  )
}

export default Box
