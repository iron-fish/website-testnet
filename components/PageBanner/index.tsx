import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { RawButton } from '../Button'

type PageBannerProps = {
  title: string
  text: ReactNode
  buttonText?: string
  buttonClassName?: string
  buttonLink?: string
  children?: ReactNode
}
export const PageBanner: FC<PageBannerProps> = ({
  title,
  text,
  buttonText = '',
  buttonClassName = '',
  buttonLink = '',
  children,
}) => {
  const renderButton = buttonText && buttonLink
  return (
    <div>
      <h1
        className={clsx(
          'text-left',
          'text-5xl',
          'ml-3',
          'mt-24',
          'mb-8',
          'font-extended',
          'md:ml-0',
          'md:text-6xl',
          'md:text-center'
        )}
      >
        {title}
      </h1>
      <div className="container mx-auto w-3/4">
        <p
          className={clsx(
            `mb-8`,
            `text-left`,
            `text-lg`,
            `md:text-center`,
            `md:text-2xl`
          )}
        >
          {text}
        </p>
      </div>
      {children}
      {renderButton ? (
        <Link href={buttonLink} passHref>
          <RawButton
            className={clsx(
              buttonClassName,
              `m-auto`,
              `mt-8`,
              `text-lg`,
              `px-7`,
              `py-4`,
              `md:text-xl`
            )}
          >
            {buttonText}
          </RawButton>
        </Link>
      ) : (
        <div className={clsx('m-auto', 'mt-8', 'text-lg', 'px-7', 'py-4')} />
      )}
    </div>
  )
}

export default PageBanner
