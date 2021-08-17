import React from 'react'

import Link from 'next/link'
import TestnetGridElement from './TestnetGridElement'
import SectionHeader from './SectionHeader'

function Company() {
  const elementClassName = `mr-2 lg:mr-4 p-2 lg:p-4`
  const textClassName = `ml-2 lg:ml-4`
  return (
    <div className="absolute bg-white left-0 right-0 shadow-navbar">
      <div className="flex flex-col items-center border-b border-t p-8 pb-10">
        <div>
          <div className="flex flex-col">
            <SectionHeader>COMPANY</SectionHeader>
            <div className="flex">
              <TestnetGridElement
                href="https://ironfish.network/about"
                header="About Us"
                body="Learn who Iron Fish is"
                className={`${elementClassName} -ml-2.5`}
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
  )
}

export default Company
