import clsx from 'clsx'
import { JumioFlowContainer } from 'components/Airdrop/JumioFlowContainer/JumioFlowContainer'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import { CoolFish } from './CoolFish'

export default function StepKYCComplete() {
  const router = useRouter()
  return (
    <JumioFlowContainer className="flex">
      <div className={clsx('p-12', 'flex', 'flex-col')}>
        <h1 className={clsx('font-extended', 'text-4xl', 'mb-8')}>KYC Form</h1>
        <div className={clsx('flex', 'justify-center', 'mt-4', 'mb-8')}>
          <CoolFish />
        </div>
        <h2
          className={clsx('font-extended', 'text-2xl', 'mb-8', 'text-center')}
        >
          Verifying your documents.
        </h2>
        <p className="text-center">
          Thanks for submitting your documents. The verification process can
          take up to 48 hours. You can check the results of your verification in
          your dashboard.
        </p>
        <div className="mb-auto" />
        <div className={clsx('flex', 'justify-end')}>
          <Button
            onClick={() => {
              router.push('/dashboard')
            }}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </JumioFlowContainer>
  )
}
