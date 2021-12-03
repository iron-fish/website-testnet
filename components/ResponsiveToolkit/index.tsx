import { useEffect, useState } from 'react'
import clsx from 'clsx'
import useQuery from 'hooks/useQuery'
import { LoginContext } from 'contexts/LoginContext'
import styles from './ResponsiveToolkit.module.css'
import pkg from 'package.json'

type BreakpointProps = {
  at: string
  horizontal?: boolean
}

const Breakpoint = ({ at, horizontal = true }: BreakpointProps) => {
  const value = horizontal ? at : at.slice(1)
  const isVertical = at.startsWith('v')
  return (
    <div
      className={clsx({
        [styles.breakpoint]: !isVertical,
        [styles.relativeBreakpoint]: at.indexOf('%') > -1,
        [styles.vbreakpoint]: isVertical,
      })}
      style={{ [horizontal ? 'left' : 'top']: value }}
      data-value={value}
    />
  )
}

const points = [
  `768px`,
  `1024px`,
  `1152px`,
  `1280px`,
  `1440px`,
  `1536px`,
  `1700px`,
  '10%',
  '25%',
  '50%',
  '75%',
  '90%',
]

type ResponsiveToolkitProps = {
  userDetails: LoginContext
}

const ResponsiveToolkit = ({ userDetails }: ResponsiveToolkitProps) => {
  const [$active, $setActive] = useState(true)
  const [$width, $setWidth] = useState(-1)
  const [$point, $setPoint] = useState(0)
  const toggle = () => $setActive(!$active)
  const $toolkit = useQuery('debug')
  const $customPoint = useQuery('point')
  useEffect(() => {
    const activePoints = () =>
      points
        .filter(z => z.includes('px'))
        .map(z => parseInt(z.slice(0, -2)))
        .reduce((x, y) => (y <= $width ? y : x), 0)
    const update = () => {
      $setWidth(window.innerWidth)
      const newPoints = activePoints()
      // eslint-disable-next-line no-console
      console.log({ points: newPoints, $customPoint })
      $setPoint(newPoints)
    }
    if ($toolkit) {
      update()
      window.addEventListener('resize', update)
    }
    return () => window.removeEventListener('resize', update)
  }, [$width, $setWidth, $point, $setPoint, $toolkit, $customPoint])

  const pointsPlus = $customPoint ? points.concat($customPoint) : points
  const horizontal = pointsPlus.filter(z => !z.startsWith('v'))
  const vertical = pointsPlus.filter(z => z.startsWith('v'))

  return $toolkit ? (
    <>
      <div className={styles.toolkit} onClick={toggle}>
        {$point}px <span className={styles.ruler}>📐</span> {$width}px
      </div>
      <div className={styles.debugMode}>
        {pkg.name}@{pkg.version}
      </div>
      <div className={styles.contextual}></div>
      {$active && horizontal.map(x => <Breakpoint key={x} at={x} />)}
      {$active &&
        vertical.map(x => <Breakpoint key={x} at={x} horizontal={false} />)}
    </>
  ) : (
    <span />
  )
}
export default ResponsiveToolkit
