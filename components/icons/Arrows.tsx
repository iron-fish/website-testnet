import CSS from 'csstype'

type Props = {
  className?: string
  style?: CSS.Properties
}

export const ArrowLeft = ({ className, style }: Props) => (
  <svg
    width="39"
    height="25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path d="M16 24L2.5 13L16 1" stroke="black" strokeWidth="2" />
    <path d="M2.5 13L38.5 13" stroke="black" strokeWidth="2" />
  </svg>
)
export const ArrowRight = ({ className, style }: Props) => (
  <svg
    width="39"
    height="25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path d="M23 1L36.5 12L23 24" stroke="black" strokeWidth="2" />
    <path d="M36.5 12H0.5" stroke="black" strokeWidth="2" />
  </svg>
)

export const TaillessArrowRight = ({ className, style }: Props) => (
  <svg
    width="19"
    height="23"
    viewBox="0 0 19 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path d="M1.5 1L17 11.5L1.5 22" stroke="black" strokeWidth="2" />
  </svg>
)
