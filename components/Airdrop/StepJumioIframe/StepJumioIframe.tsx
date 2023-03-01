import clsx from 'clsx'
import Loader from 'components/Loader'
import { useEffect, useRef } from 'react'
import { useCreateKycFlow } from '../hooks/useCreateKycFlow'
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

export default function StepJumioIframe({
  userAddress,
  onFinish,
}: JumioIframeProps) {
  useHandleJumioEvents(onFinish)

  const createKycFlow = useCreateKycFlow(userAddress)

  // eslint-disable-next-line
  console.log({ createKycFlow })

  const loading = true
  const url = ''

  return (
    <JumioFlowContainer>
      {loading ? (
        <div
          className={clsx(
            'flex',
            'flex-col',
            'absolute',
            'inset-0',
            'justify-center'
          )}
        >
          <Loader />
        </div>
      ) : (
        <iframe
          src={url}
          className={styles.iframe}
          width="100%"
          height="100%"
          allow="camera;fullscreen;accelerometer;gyroscope;magnetometer"
          allowFullScreen
        />
      )}
    </JumioFlowContainer>
  )
}
