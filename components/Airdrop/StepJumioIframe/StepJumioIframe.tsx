import clsx from 'clsx'
import Button from 'components/Button'
import Loader from 'components/Loader'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef } from 'react'
import { useGetKycWorkflowUrl } from '../hooks/useCreateKycFlow'
import { JumioFlowContainer } from '../JumioFlowContainer/JumioFlowContainer'
import styles from './JumioIframe.module.css'

function useHandleJumioEvents(onFinish: () => void) {
  const finishHandlerRef = useRef(onFinish)

  useEffect(() => {
    function handleMessage(message: MessageEvent) {
      if (!message.origin.endsWith('jumio.ai')) {
        return
      }

      const data = JSON.parse(message.data)
      // eslint-disable-next-line no-console
      console.log(data)

      if (['success', 'error'].includes(data.payload.value)) {
        finishHandlerRef.current()
      }
    }
    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [onFinish])
}

type JumioIframeProps = {
  userAddress: string
  onFinish: () => void
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
  userAddress,
  onFinish,
}: JumioIframeProps) {
  useHandleJumioEvents(onFinish)

  const { url, loading, error } = useGetKycWorkflowUrl(userAddress)
  const router = useRouter()

  const content = useMemo(() => {
    if (loading) {
      return (
        <Container>
          <Loader />
        </Container>
      )
    }
    if (!url || error) {
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
  }, [error, loading, url, router])

  return <JumioFlowContainer>{content}</JumioFlowContainer>
}
