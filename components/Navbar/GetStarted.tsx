import React from "react"

import Cube from './Cube'
import Link from 'next/link'

type SectionHeaderProps = {
  children?: React.ReactNode;
  className?: string;
}

const SectionHeader = ({ children, className }: SectionHeaderProps) =>
  <h3 className={`font-favorit text-ifgray text-sm mb-7 ${className}`}>{children}</h3>

type TestnetGridElementProps = {
  header: string;
  href: string;
  body: string;
  cubeClassName: string;
}

const TestnetGridElement = ({ href, header, body, cubeClassName }: TestnetGridElementProps) =>
  <Link href={href}>
    <a className="flex items-center p-4 rounded hover:bg-iflightgray">
      <Cube className={cubeClassName} />
      <div className="flex flex-col ml-4">
        <h5>{header}</h5>
        <p className="font-favorit text-ifgray text-sm">{body}</p>
      </div>
    </a>
  </Link>

function GetStarted() {
  return (
    <div className="absolute bg-white left-0 right-0 shadow-navbar">
    <div className="flex justify-center border-b border-t">
      <div className="flex justify-end border-r p-8">
        <div style={{ maxWidth: "14rem" }}>
          <SectionHeader>IRON FISH CLI</SectionHeader>
          <div>
            <h4 className="text-xl mb-1">Installation Guide</h4>
            <p className="font-favorit text-ifgray text-sm mb-2">An in-depth walkthrough of how to set up Iron Fish on your machine.</p>
            <a className="flex font-favorit text-ifgray text-sm">
              <span>Read the walkthrough</span>
              <span className="ml-2">&#x203A;</span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex p-8">
        <div>
          <SectionHeader>INCENTIVIZED TESTNET</SectionHeader>
          <div className="grid grid-rows-2 grid-cols-2 gap-4 -m-4">
            <TestnetGridElement href="/about" header="About the Testnet" body="How to earn points" cubeClassName="text-iforange" />
            <TestnetGridElement href="/community" header="Testnet Community" body="From our supporters" cubeClassName="text-ifbeige" />
            <TestnetGridElement href="/leaderboard" header="Testnet Leaderboard" body="Earn your way to the top" cubeClassName="text-ifpink" />
            <TestnetGridElement href="/faq" header="Testnet FAQ" body="Frequently asked questions" cubeClassName="text-iflightblue" />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
  
export default GetStarted
  