import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGetKycWorkflowUrl } from 'components/Airdrop/hooks/useCreateKycFlow'
import { JumioFlowContainer } from 'components/Airdrop/JumioFlowContainer/JumioFlowContainer'
import { JumioWorkflow } from 'components/Airdrop/types/JumioTypes'
import Button from 'components/Button'
import Loader from 'components/Loader'
import styles from './JumioIframe.module.css'

function useHandleJumioEvents(onSuccess: () => void, onError: () => void) {
  const successHandlerRef = useRef(onSuccess)
  const errorHandlerRef = useRef(onError)

  useEffect(() => {
    function handleMessage(message: MessageEvent) {
      if (!message.origin.endsWith('jumio.ai')) {
        return
      }

      const data = JSON.parse(message.data)

      if (data.payload.value === 'success') {
        successHandlerRef.current()
      }
      if (data.payload.value === 'error') {
        // eslint-disable-next-line no-console
        console.error(data)
        errorHandlerRef.current()
      }
    }
    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [onSuccess, onError])
}

type JumioIframeProps = {
  workflow: JumioWorkflow
  userAddress: string
  onSuccess: () => void
}

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

export default function StepJumioIframe({
  workflow,
  userAddress,
  onSuccess,
}: JumioIframeProps) {
  const { url, loading, error } = useGetKycWorkflowUrl(workflow, userAddress)
  const router = useRouter()

  const [hasJumioError, setHasJumioError] = useState(false)
  useHandleJumioEvents(onSuccess, () => {
    setHasJumioError(true)
  })

  const content = useMemo(() => {
    if (loading) {
      return (
        <Container>
          <Loader />
        </Container>
      )
    }
    if (!url || error || hasJumioError) {
      return (
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
      )
    }
    return (
      <iframe
        src={url}
        className={styles.iframe}
        width="100%"
        height="100%"
        allow="camera;fullscreen;accelerometer;gyroscope;magnetometer"
        allowFullScreen
      />
    )
  }, [error, loading, url, router, hasJumioError])

  return <JumioFlowContainer>{content}</JumioFlowContainer>
}
