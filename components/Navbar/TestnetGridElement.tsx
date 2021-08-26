import Link from 'next/link'
import RightArrow from 'components/icons/RightArrow'

import Cube from './Cube'

type TestnetGridElementProps = {
  header: string
  href: string
  body: string
  cubeClassName: string
  className?: string
  textClassName: string
}

const TestnetGridElement = ({
  className,
  href,
  header,
  body,
  cubeClassName,
  textClassName,
}: TestnetGridElementProps) => (
  <Link href={href}>
    <a
      className={`flex items-center ${className} rounded relative hover:bg-iflightgray`}
    >
      <Cube className={cubeClassName} />
      <div className={`flex flex-col ${textClassName}`}>
        <h5>{header}</h5>
        <p className="font-favorit text-ifgray text-sm">{body}</p>
      </div>
      <RightArrow className="absolute right-0  md:hidden" />
    </a>
  </Link>
)

export default TestnetGridElement
