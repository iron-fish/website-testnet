import clsx from 'clsx'

import { ReactNode, useMemo } from 'react'

import styles from './InfoChip.module.css'

type ChipProps = {
  children: ReactNode
  variant: 'info' | 'pending' | 'warning' | 'complete' | 'airdrop'
  align?: 'left' | 'center'
  wrap?: boolean
  className?: string
}

export function InfoChip({
  children,
  variant,
  align,
  wrap = false,
  className,
}: ChipProps) {
  const colors = useMemo(() => {
    return {
      info: styles.info,
      pending: styles.pending,
      warning: styles.warning,
      complete: styles.complete,
      airdrop: styles.airdrop,
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
        colors,
        className
      )}
    >
      <div
        className={clsx(
          align ? `text-${align}` : 'md:text-center',
          !wrap && 'md:whitespace-nowrap'
        )}
      >
        {children}
      </div>
    </div>
  )
}
