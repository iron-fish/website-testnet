import Link from 'next/link'
import clsx from 'clsx'

import { readingLinks } from 'components/KeepReading/data'

import { TaillessArrowRight } from 'components/icons/Arrows'

import { AboutHeader } from 'components/About/Header'

type KeepReadingProps = {
  background?: string
}

export default function KeepReading({
  background = 'bg-iflightorange',
}: KeepReadingProps) {
  return (
    <div className="mt-12 mx-3 w-full md:w-2/3 mb-24">
      <AboutHeader className="text-left text-4xl mx-4">
        Keep Reading
      </AboutHeader>
      <ul className="px-4">
        {readingLinks.map(({ text, href }) => (
          <li
            className="list-style-none w-full lg:w-1/2 flex relative h-8 my-6"
            key={text}
          >
            <Link passHref href={href}>
              <a className="w-full flex relative h-8 my-6">
                <div
                  className={clsx(
                    'text-2xl',
                    'font-extended',
                    'absolute',
                    'left-0',
                    'h-8',
                    'z-10',
                    'pr-4',
                    background
                  )}
                >
                  {text}
                </div>
                <div className="w-full relative flex justify-between">
                  <div
                    className="border-black h-1/2 border-b-2 -mr-4"
                    style={{ width: 'calc(100% - 2px)' }}
                  />
                  <TaillessArrowRight
                    style={{ marginTop: '3.5px' }}
                    className="absolute right-0"
                  />
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
