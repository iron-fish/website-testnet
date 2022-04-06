import clsx from 'clsx'
import { Props } from './types'

interface CustomProps extends Props {
  size?: string
  rounded?: boolean
  cb?: string
  cr?: string
  cl?: string
  mt?: string
  mb?: string
  ml?: string
  mr?: string
}

export function CustomBox({
  size = '2.5',
  className = '',
  container = false,
  children,
  background = 'bg-white',
  behind = 'bg-transparent',
  rounded = false,
  // container,
  cb = '',
  cr = '',
  cl = '',
  // margin
  mt = '',
  mb = '',
  ml = '',
  mr = '',
}: CustomProps) {
  return (
    <div
      className={clsx(
        `relative`,
        cb ? cb : `mb-${size}`,
        container ? (cl ? cl : `ml-${size}`) : ``,
        cr ? cr : `mr-${size}`,
        className
      )}
    >
      <div
        className={clsx(
          'absolute',
          'border',
          'border-black',
          mt ? mt : `top-${size}`,
          mb ? mb : `-bottom-${size}`,
          ml ? ml : `left-${size}`,
          mr ? mr : `-right-${size}`,
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
