import clsx from 'clsx'
import styles from './styles.module.css'

import { Alignment, ConditionalToastProps } from './types'

export const Toast = ({
  alignment,
  visible,
  message,
  action,
  actionLabel,
}: ConditionalToastProps) => {
  const topAligned = alignment === Alignment.Top
  return (
    <div
      className={clsx(
        'w-full',
        'fixed',
        'z-30',
        'flex',
        styles.toast,
        topAligned ? styles.top : styles.bottom,
        topAligned ? 'top-0' : 'bottom-0',
        {
          [topAligned ? styles.topHidden : styles.bottomHidden]:
            message === '' || !visible,
        }
      )}
    >
      <div
        className={clsx(
          'Toast',
          'max-w-[16rem]',
          'mx-auto',
          'flex',
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
  )
}

export default Toast
