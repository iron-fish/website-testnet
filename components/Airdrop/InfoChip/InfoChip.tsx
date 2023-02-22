import clsx from 'clsx'

import { ReactNode, useMemo } from 'react'

type ChipProps = {
  children: ReactNode
  variant: 'info' | 'pending' | 'warning'
}

export function InfoChip({ children, variant }: ChipProps) {
  const colors = useMemo(() => {
    return {
      info: ['bg-iflightgray'],
      pending: ['bg-iflightbeige'],
      warning: ['text-alertred', 'bg-alertred', 'bg-opacity-10'],
    }[variant]
  }, [variant])
  return (
    <div
      className={clsx(
        'text-sm',
        'text-center',
        'md:text-md',
        'px-3',
        'py-2',
        ...colors,
        'inline-block',
        'rounded'
      )}
    >
      {children}
    </div>
  )
}
