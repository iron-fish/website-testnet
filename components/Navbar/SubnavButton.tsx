export type SubnavButtonProps = {
  label: string
  className?: string
  // selectedClassName: string
  isVisible: boolean
  onMouseOver?: () => unknown
}

export const SubnavButton = ({
  label,
  isVisible,
  onMouseOver,
  className,
}: // selectedClassName,
SubnavButtonProps) => (
  <button onMouseOver={onMouseOver} className={className}>
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
