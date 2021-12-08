import clsx from 'clsx'
import Link from 'next/link'
import Intertubes from 'components/About/ImageIntertubes'
import { RawButton } from 'components/Button'

type TubesCTAProps = {
  cta: string
  goTo: string
  buttonText: string
}
export function TubesCTA({ cta, goTo, buttonText }: TubesCTAProps) {
  return (
    <>
      <div className="w-full flex mt-36 border-black border-b">
        <Intertubes />
      </div>
      <div className="w-full flex mt-16 border-black border-b flex-col">
        <h3 className="font-extended text-3xl md:text-4xl m-auto text-center">
          What are you <br className="md:hidden" />
          waiting for?
          <br />
          {cta}
        </h3>
        <Link passHref href={goTo}>
          <>
            <RawButton
              className={clsx(
                'm-auto',
                'mt-8',
                'mb-16',
                'max-w-[240px]',
                'text-lg',
                'px-4',
                'py-3',
                'md:text-xl',
                'md:py-5',
                'md:px-4'
              )}
            >
              {buttonText}
            </RawButton>
          </>
        </Link>
      </div>
    </>
  )
}

export default TubesCTA
