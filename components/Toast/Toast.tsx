import clsx from 'clsx'

import { ConditionalToastProps } from './types'

export const Toast = ({
  visible,
  message,
  action,
  actionLabel,
}: ConditionalToastProps) =>
  visible && message !== '' ? (
    <div className={clsx('w-full', 'absolute', 'bottom-0', 'z-50', 'flex')}>
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
          'py-3.5'
        )}
      >
        <div className={clsx('Toast__message', 'relative')}>{message}</div>
        {action && actionLabel ? (
          <button onClick={action}>{actionLabel}</button>
        ) : null}
      </div>
    </div>
  ) : null

export default Toast
