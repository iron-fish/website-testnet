import { FC } from 'react'
import RawButton from '../Button'

type ButtonProps = {
  colorClassName?: string
  className?: string
  title: string
  text: string
  buttonText: string
}
export const PageBanner: FC<ButtonProps> = ({
  className = '',
  title = '',
  text = '',
  buttonText,
}) => {
  return (
    <div className={className}>
      <h1 className="text-left md:text-center text-5xl md:text-6xl mt-24 mb-8 font-extended">
        {title}
      </h1>
      <div className="container mx-auto w-3/4">
        <p className="text-justify text-lg md:text-center md:text-2xl mb-8 font-favorit">
          {text}
        </p>
      </div>
      <RawButton className="m-auto w-full mb-32 mt-8 max-w-[240px] text-lg md:text-xl p-3 md:py-5 md:px-4">
        {buttonText}
      </RawButton>
    </div>
  )
}

export default PageBanner
