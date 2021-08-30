import CSS from 'csstype'

type IconProps = {
  style?: CSS.Properties
  className?: string
}

export const Disclosable = ({ style, className }: IconProps) => (
  <svg
    viewBox="0 0 13 6"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path d="M13 0L0 0L6.5 6L13 0Z" />
  </svg>
)

export default Disclosable
