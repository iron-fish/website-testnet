import styles from './index.module.css'

type BreakpointProps = {
  left: number
  label: string
}

const Breakpoint = ({ left, label }: BreakpointProps) => (
  <div
    className={styles.breakpoint}
    style={{
      left,
    }}
    data-label={label}
    data-left={left}
  />
)
const points = [
  { label: 'sm', left: 640 },
  { label: 'md', left: 768 },
  { label: 'lg', left: 1024 },
  { label: 'xl', left: 1280 },
  { label: '2xl', left: 1536 },
]

const Breakpoints = () => (
  <>
    {points.map(({ label, left }) => (
      <Breakpoint key={label} left={left} label={label} />
    ))}
  </>
)

export default Breakpoints
