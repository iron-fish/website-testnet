function ChevronRight({ width = 16, color = '#2C72FF' }) {
  return (
    <svg
      width={width}
      height={width + width / 4}
      viewBox="0 0 16 16"
      className="ml-2 min-w-[1rem]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66656 4L5.72656 4.94L8.7799 8L5.72656 11.06L6.66656 12L10.6666 8L6.66656 4Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronRight
