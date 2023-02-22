import clsx from 'clsx'
import ChevronRight from 'components/icons/ChevronRight'

import { Box } from 'components/OffsetBorder/Box'
import Link from 'next/link'
import { ReactNode } from 'react'

type KYCActionProps = {
  title: string
  children: string
  chip: ReactNode
  href: string
}

export function KYCAction({ title, children, chip, href }: KYCActionProps) {
  return (
    <Link href={href}>
      <a className={clsx('mb-3', 'block')}>
        <Box behind={'bg-ifpink'}>
          <div
            className={clsx('p-12', 'flex', 'justify-between', 'items-center')}
          >
            <div>
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
            <ChevronRight width={40} color={'black'} />
          </div>
        </Box>
      </a>
    </Link>
  )
}
