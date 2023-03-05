import styles from './JumioFlowContainer.module.css'
import type { ReactNode } from 'react'
import clsx from 'clsx'

export function JumioFlowContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={clsx(styles.bg, className)}>{children}</div>
      </div>
    </div>
  )
}
