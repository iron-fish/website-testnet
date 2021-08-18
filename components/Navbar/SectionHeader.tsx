type SectionHeaderProps = {
  children?: React.ReactNode
  className?: string
}

const SectionHeader = ({ children, className }: SectionHeaderProps) => (
  <h3 className={`font-favorit text-ifgray text-sm mb-7 ${className}`}>
    {children}
  </h3>
)

export default SectionHeader
