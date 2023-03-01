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
          You are about to begin the identity verification process. In order to
          successfully complete this process, you will be asked to provide a
          valid government-issued ID. Please ensure you have a valid ID ready.
        </p>
        <p className="mb-2">
          Once started, you will have 15 minutes to finish. If you do not finish
          in time, the KYC process will fail.
        </p>
        <p>You will have up to 3 attempts to complete the KYC process.</p>
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
