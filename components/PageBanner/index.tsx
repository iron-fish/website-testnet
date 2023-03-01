import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { RawButton } from '../Button'

type PageBannerProps = {
  title: ReactNode
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
  disableButton = false,
}) => {
  const renderButton = disableButton! && buttonText && buttonLink
  return (
    <div className={clsx('w-full', 'md:w-fit', 'md:max-w-[74rem]')}>
      <h1
        className={clsx(
          'text-left',
          'text-4xl',
          // 'w-3/5',
          'mx-[12.5%]',
          'mt-8',
          'mb-8',
          'font-extended',
          'md:mx-4',
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
