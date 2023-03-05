import clsx from 'clsx'
import { useRouter } from 'next/router'

import Button from 'components/Button'
import { JumioFlowContainer } from '../JumioFlowContainer/JumioFlowContainer'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'absolute',
        'inset-0',
        'justify-center',
        'p-12'
      )}
    >
      {children}
    </div>
  )
}

export default function StepJumioError() {
  const router = useRouter()

  return (
    <JumioFlowContainer>
      <Container>
        <h2
          className={clsx('text-2xl', 'font-extended', 'mb-4', 'text-center')}
        >
          Something went wrong
        </h2>
        <p className={clsx('text-lg', 'text-center', 'mb-8')}>
          An error occurred. Please return to the dashboard and try again.
        </p>
        <div className={clsx('flex', 'justify-center')}>
          <Button
            onClick={() => {
              router.push('/dashboard')
            }}
          >
            Back to Dashboard
          </Button>
        </div>
      </Container>
    </JumioFlowContainer>
  )
}
