import clsx from 'clsx'

import { ConditionalToastProps } from './types'

export const Toast = ({
  visible,
  message,
  action,
  actionLabel,
}: ConditionalToastProps) => (
  <div className={clsx('w-full', 'fixed', 'bottom-0', 'z-50', 'flex')}>
    <div
      className={clsx(
        'max-w-[16rem]',
        'mx-auto',
        'mb-16',
        'flex',
        'Toast',
        'bg-black',
        'text-white',
        'text-base',
        'px-6',
        'py-3.5',
        'transition-opacity',
        visible ? 'visible' : 'invisible'
      )}
    >
      <div className={clsx('Toast__message', 'relative')}>{message}</div>
      {action && actionLabel ? (
        <button onClick={action}>{actionLabel}</button>
      ) : null}
    </div>
  </div>
)

export default Toast
