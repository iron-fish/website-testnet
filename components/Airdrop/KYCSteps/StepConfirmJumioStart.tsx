import clsx from 'clsx'
import { JumioFlowContainer } from 'components/Airdrop/JumioFlowContainer/JumioFlowContainer'
import Button from 'components/Button'

type Props = {
  onNext: () => void
}

export default function StepConfirmJumioStart({ onNext }: Props) {
  return (
    <JumioFlowContainer className="flex">
      <div className={clsx('p-12', 'flex', 'flex-col')}>
        <h1 className={clsx('font-extended', 'text-4xl', 'mb-8')}>KYC Form</h1>
        <p className="mb-2">
          KYC will require you to upload a passport, driver&#39;s license or
          government identity card.
        </p>
        <p className="mb-2">You will have 15 minutes to complete KYC.</p>
        <p>
          Click here to{' '}
          <a
            className="underline"
            target="_blank"
            href="https://coda.io/d/_dte_X_jrtqj/KYC-FAQ_su_vf#_luc1r"
            rel="noreferrer"
          >
            see our KYC FAQ
          </a>
          .
        </p>
        <div className="mb-auto" />
        <div className={clsx('flex', 'justify-end')}>
          <Button
            onClick={() => {
              onNext()
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </JumioFlowContainer>
  )
}
