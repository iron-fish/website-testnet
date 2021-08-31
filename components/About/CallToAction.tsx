import type { ReactNode } from 'react'
import Link from 'next/link'

import { Box } from 'components/OffsetBorder/Box'
import { RawButton } from 'components/Button'

type CTAProps = {
  title: string
  content?: string
  children?: ReactNode
  kind?: string
  earn?: number
  points?: string[]
  ctaText?: string
  href?: string
}

export const CallToAction = ({
  children,
  title,
  points = [],
  kind = 'Earn Points By',
  earn = 1000,
  href,
  ctaText,
}: CTAProps) => {
  const button = ctaText ? (
    <RawButton
      border="border"
      className="m-auto w-full mt-8 max-w-md mb-2 text-md p-2"
      colorClassName="text-black bg-transparent hover:bg-black hover:text-white"
    >
      {href ? <Link href={href}>{ctaText}</Link> : ctaText}
    </RawButton>
  ) : null
  return (
    <div className="mb-3">
      <Box behind="ifpink">
        <div className="m-4 pb-2">
          <strong className="uppercase">{kind}</strong>
          <h3 className="text-left text-2xl md:text-3xl mt-3 mb-4 font-extended">
            {title}
          </h3>
          {children}
          {points && points.length > 0 && (
            <ul className="pl-3 ml-3">
              {points.map((p: string) => (
                <li className="list-disc my-3" key={p}>
                  {p}
                </li>
              ))}
            </ul>
          )}
          {earn > 0 && (
            <div className="bg-ifpink px-4 py-2 inline-block mt-2 text-xs md:text-md">
              Earn up to{' '}
              {earn.toLocaleString('en-US', { minimumFractionDigits: 0 })}{' '}
              points a week
            </div>
          )}
          {ctaText && href && button ? (
            <Link href={href}>{button}</Link>
          ) : (
            button
          )}
        </div>
      </Box>
    </div>
  )
}

export const renderColumn = ({ title, content, ...ctaProps }: CTAProps) => (
  <CallToAction title={title} key={title} {...ctaProps}>
    {content}
  </CallToAction>
)

export default CallToAction
