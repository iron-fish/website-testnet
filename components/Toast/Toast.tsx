import clsx from 'clsx'
import styles from './styles.module.css'

import { ConditionalToastProps } from './types'

export const Toast = ({
  visible,
  message,
  action,
  actionLabel,
}: ConditionalToastProps) => (
  <div
    className={clsx(
      'w-full',
      'fixed',
      'z-50',
      'flex',
      styles.toast,
      styles.bottom,
      'bottom-0',
      {
        [styles.bottomHidden]: !visible,
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

export default Toast
