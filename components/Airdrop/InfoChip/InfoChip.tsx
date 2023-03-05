import clsx from 'clsx'

import { ReactNode, useMemo } from 'react'
import PendingIcon from './icons/Pending'
import WarningIcon from './icons/Warning'

import styles from './InfoChip.module.css'

type ChipProps = {
  children: ReactNode
  variant: 'info' | 'pending' | 'warning' | 'complete'
  icon?: boolean
}

export function InfoChip({ children, variant, icon }: ChipProps) {
  const colors = useMemo(() => {
    return {
      info: styles.info,
      pending: styles.pending,
      warning: styles.warning,
      complete: styles.complete,
    }[variant]
  }, [variant])
  return (
    <div
      className={clsx(
        'text-sm',
        'md:text-md',
        'px-3',
        'py-2',
        'inline-block',
        'rounded',
        'inline-flex',
        'items-center',
        'gap-2',
        'justify-center',
        colors
      )}
    >
      {icon && (
        <div className={clsx('hidden', 'md:block')}>
          {variant === 'warning' && <WarningIcon />}
          {variant === 'pending' && <PendingIcon />}
          {variant === 'complete' && <WarningIcon />}
        </div>
      )}
      <div className="md:text-center md:whitespace-nowrap">{children}</div>
    </div>
  )
}
