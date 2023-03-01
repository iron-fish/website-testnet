import { useEffect } from 'react'
import { JumioFlowContainer } from '../JumioFlowContainer/JumioFlowContainer'
import styles from './JumioIframe.module.css'

type JumioIframeProps = {
  src: string
}

function useHandleJumioEvents() {
  useEffect(() => {
    function handleMessage(message: MessageEvent) {
      if (!message.origin.endsWith('jumio.ai')) {
        return
      }

      const data = JSON.parse(message.data)
      // eslint-disable-next-line no-console
      console.log(data)

      if (data.payload.value === 'success') {
        // eslint-disable-next-line no-console
        console.log('success')
      }
      if (data.payload.value === 'error') {
        // eslint-disable-next-line no-console
        console.log('error')
      }
    }
    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])
}

export function JumioIframe({ src }: JumioIframeProps) {
  useHandleJumioEvents()

  return (
    <JumioFlowContainer>
      <iframe
        src={src}
        className={styles.iframe}
        width="100%"
        height="100%"
        allow="camera;fullscreen;accelerometer;gyroscope;magnetometer"
        allowFullScreen
      />
    </JumioFlowContainer>
  )
}
