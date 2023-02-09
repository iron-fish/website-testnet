import clsx from 'clsx'

import { Box } from 'components/OffsetBorder/Box'
import Link from 'next/link'
import { ReactNode, useMemo } from 'react'

type KYCActionProps = {
  title: string
  children: string
  chip: ReactNode
  href?: string
}

function Wrapper({ href, children }: { href?: string; children: ReactNode }) {
  if (href) {
    return <Link href={href}>{children}</Link>
  }

  return <div>{children}</div>
}

function KYCAction({ title, children, chip, href }: KYCActionProps) {
  return (
    <Wrapper href={href}>
      <div className="mb-3">
        <Box behind={'bg-ifpink'}>
          <div className="p-13">
            <strong className={clsx('text-lg')}>{title}</strong>
            <h3
              className={clsx(
                'text-left',
                'text-4xl',
                'mt-3',
                'mb-4',
                'font-extended'
              )}
            >
              {children}
            </h3>
            {chip}
          </div>
        </Box>
      </div>
    </Wrapper>
  )
}

type ChipProps = {
  children: ReactNode
  variant: 'info' | 'warning'
}

function Chip({ children, variant }: ChipProps) {
  const colors = useMemo(() => {
    return {
      info: ['bg-iflightbeige'],
      warning: ['text-alertred', 'bg-alertred', 'bg-opacity-10'],
    }[variant]
  }, [variant])
  return (
    <div
      className={clsx(
        'text-sm',
        'md:text-md',
        'px-2',
        'py-2',
        // 'bg-iflightbeige',
        ...colors,
        'inline-block',
        'rounded'
      )}
    >
      {children}
    </div>
  )
}

KYCAction.Chip = Chip

export { KYCAction }
