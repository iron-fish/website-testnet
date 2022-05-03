import React from 'react'
import clsx from 'clsx'

import TestnetGridElement from './TestnetGridElement'
import SectionHeader from './SectionHeader'

type CompanyProps = {
  condensed?: boolean
  showNotification?: boolean
}

function Company({ showNotification, condensed = false }: CompanyProps) {
  const elementClassName = clsx(
    'p-2',
    'lg:p-4',
    'lg:mr-4',
    condensed ? '' : 'mr-2'
  )
  const textClassName = clsx('lg:ml-4', condensed ? 'ml-4' : 'ml-2')
  const className = condensed
    ? clsx('bg-white', 'z-40', 'w-full')
    : clsx(
        'absolute',
        'bg-white',
        'left-0',
        'right-0',
        'shadow-navbar',
        'z-40',
        showNotification ? 'top-[9.5rem]' : 'top-5.5'
      )
  return (
    <div className="flex">
      <div
        className={className}
        style={{ clipPath: !condensed ? 'inset(0 0 -100% 0)' : undefined }}
      >
        <div
          className={`flex flex-col ${
            condensed
              ? 'w-full items-start p-2'
              : 'border-b border-t items-center p-8'
          }`}
        >
          <div className={condensed ? 'w-full' : ''}>
            <div className={`flex flex-col ${condensed ? 'w-full' : ''}`}>
              {!condensed && <SectionHeader>COMPANY</SectionHeader>}
              <div
                className={`flex ${condensed ? 'flex-col w-full' : 'flex-row'}`}
              >
                <TestnetGridElement
                  href="https://ironfish.network/about"
                  header="About Us"
                  body="Learn who Iron Fish is"
                  className={`${elementClassName} ${
                    condensed ? '' : '-ml-2.5'
                  }`}
                  textClassName={textClassName}
                  cubeClassName="text-iforange"
                />
                <TestnetGridElement
                  href="https://ironfish.network/careers"
                  header="Careers"
                  body="We're hiring!"
                  className={elementClassName}
                  textClassName={textClassName}
                  cubeClassName="text-ifbeige"
                />
                <TestnetGridElement
                  href="https://ironfish.network/blog"
                  header="Blog"
                  body="What we've got to say"
                  className={elementClassName}
                  textClassName={textClassName}
                  cubeClassName="text-ifcubepink"
                />
                <TestnetGridElement
                  href="https://ironfish.network/faq"
                  header="FAQ"
                  body="Frequently asked questions"
                  className={elementClassName}
                  textClassName={textClassName}
                  cubeClassName="text-iflightblue"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Company
