import clsx from 'clsx'
import { Props } from './types'

interface CustomProps extends Props {
  size: string
  rounded?: boolean
}

export function CustomBox({
  size = '2.5',
  className = '',
  container = false,
  children,
  background = 'bg-white',
  behind = 'bg-transparent',
  rounded = false,
}: CustomProps) {
  return (
    <div
      className={clsx(
        `relative`,
        `mb-${size}`,
        container ? `ml-${size}` : ``,
        `mr-${size}`,
        className
      )}
    >
      <div
        className={clsx(
          'absolute',
          'border',
          'border-black',
          `top-${size}`,
          `-bottom-${size}`,
          `left-${size}`,
          `-right-${size}`,
          rounded ? 'rounded' : '',
          behind
        )}
      />
      <div
        className={clsx(
          'relative',
          'border',
          'border-black',
          background,

          rounded ? 'rounded' : ''
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default CustomBox
