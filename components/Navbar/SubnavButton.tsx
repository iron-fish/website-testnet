export type SubnavButtonProps = {
  label: string
  className?: string
  // selectedClassName: string
  isVisible: boolean
  onClick?: () => unknown
}

export const SubnavButton = ({
  label,
  isVisible,
  onClick,
  className,
}: // selectedClassName,
SubnavButtonProps) => (
  <button onMouseEnter={onClick} className={className}>
    <span
      className={`flex items-center justify-between h-full relative ${
        isVisible ? 'text-ifgray' : ''
      }`}
    >
      {label}
      <span
        className={`ml-2 text-black ${
          isVisible ? 'transform-gpu rotate-180' : ''
        }`}
      >
        ▾
      </span>
    </span>
  </button>
)

export default SubnavButton
