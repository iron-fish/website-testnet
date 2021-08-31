import { Props } from './types'

export function Box({
  container = false,
  children,
  background = 'white',
  behind = 'transparent',
}: Props) {
  return (
    <div className={`relative mb-2.5 ${container ? `ml-2.5` : ``} mr-2.5`}>
      <div
        className={`absolute border border-black top-2.5 -bottom-2.5 left-2.5 -right-2.5 bg-${behind}`}
      />
      <div className={`relative border border-black bg-${background}`}>
        {children}
      </div>
    </div>
  )
}

export default Box
