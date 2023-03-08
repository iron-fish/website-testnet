import clsx from 'clsx'

import { ReactNode, useMemo } from 'react'

import styles from './InfoChip.module.css'

type ChipProps = {
  children: ReactNode
  variant: 'info' | 'pending' | 'warning' | 'complete'
  align?: 'left' | 'center'
  wrap?: boolean
}

export function InfoChip({
  children,
  variant,
  align,
  wrap = false,
}: ChipProps) {
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
      <div
        className={clsx(
          align ? `text-${align}` : 'md:text-center',
          wrap && 'md:whitespace-nowrap'
        )}
      >
        {children}
      </div>
    </div>
  )
}
