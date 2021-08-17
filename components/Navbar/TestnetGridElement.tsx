import Cube from './Cube'
import Link from 'next/link'

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
      className={`flex items-center ${className} rounded hover:bg-iflightgray`}
    >
      <Cube className={cubeClassName} />
      <div className={`flex flex-col ${textClassName}`}>
        <h5>{header}</h5>
        <p className="font-favorit text-ifgray text-sm">{body}</p>
      </div>
    </a>
  </Link>
)

export default TestnetGridElement
