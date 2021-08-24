type BreakpointProps = {
  left: number
}

const Breakpoint = ({ left }: BreakpointProps) => (
  <div
    style={{
      position: 'fixed',
      height: '100vh',
      width: '1rem',
      zIndex: 100,
      top: '0',
      left,
      borderLeft: '1px dashed lime',
      opacity: '0.5',
      cursor: 'crosshair',
    }}
  />
)

const Breakpoints = () => (
  <>
    <Breakpoint left={760} />
    <Breakpoint left={1024} />
    <Breakpoint left={1152} />
    <Breakpoint left={1440} />
    <Breakpoint left={1700} />
  </>
)

export default Breakpoints
