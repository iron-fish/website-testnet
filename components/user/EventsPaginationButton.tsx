import { MouseEventHandler } from 'react'
import clsx from 'clsx'

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  children?: React.ReactNode
}

function EventsPaginationButton({
  children,
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      className={clsx({
        'text-ifpink-subtext': disabled,
        'cursor-default': disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default EventsPaginationButton
