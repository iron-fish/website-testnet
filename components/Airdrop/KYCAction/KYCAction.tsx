import clsx from 'clsx'

import { Box } from 'components/OffsetBorder/Box'
import Link from 'next/link'
import { ReactNode } from 'react'

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

export function KYCAction({ title, children, chip, href }: KYCActionProps) {
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
