import clsx from 'clsx'
import ChevronRight from 'components/icons/ChevronRight'

import { Box } from 'components/OffsetBorder/Box'
import Link from 'next/link'
import { ReactNode } from 'react'

type KYCActionProps = {
  title: string
  children: ReactNode
  chip: ReactNode
  href: string
  actions?: ReactNode
}

export function KYCAction({
  title,
  children,
  chip,
  href,
  actions,
}: KYCActionProps) {
  return (
    <Link href={href}>
      <a className={clsx('mb-3', 'block')}>
        <Box behind={'bg-ifpink'}>
          <div
            className={clsx(
              'p-6',
              'md:p-12',
              'flex',
              'justify-between',
              'flex-col',
              'items-start',
              'md:flex-row',
              'md:items-center'
            )}
          >
            <div className="w-full">
              <strong className={clsx('text-md', 'md:text-lg')}>{title}</strong>
              <h3
                className={clsx(
                  'text-left',
                  'text-2xl',
                  'md:text-4xl',
                  'mt-3',
                  'mb-4',
                  'font-extended',
                  'break-words'
                )}
              >
                {children}
              </h3>
              {chip}
            </div>
            <div
              className={clsx(
                'flex',
                'gap-2',
                'flex-col',
                'xl:flex-row',
                'mt-4',
                'md:mt-0',
                'w-full',
                'md:w-auto'
              )}
            >
              {actions}
            </div>
            <div className={clsx('hidden', 'md:block', 'md:ml-4')}>
              <ChevronRight width={40} color={'black'} />
            </div>
          </div>
        </Box>
      </a>
    </Link>
  )
}
