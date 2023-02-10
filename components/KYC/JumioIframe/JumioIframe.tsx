import { useEffect } from 'react'
import styles from './JumioIframe.module.css'

// Possible error codes:
// 9100 (Error occurred on our server.)
// 9200 (Authorization token missing, invalid, or expired.)
// 9210 (Session expired after the user journey started.)
// 9300 (Error occurred transmitting image to our server.)
// 9400 (Error occurred during verification step.)
// 9800 (User has no network connection.)
// 9801 (Unexpected error occurred in the client.)
// 9810 (Problem while communicating with our server.)
// 9820 (File upload not enabled and camera unavailable.)
// 9821 (The Biometric Face Capture face capture process failed, e.g. issue with iProov)
// 9822 (Browser does not support camera.)
// 9835 (No acceptable submission in 3 attempts.)

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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <iframe
          src={src}
          className={styles.iframe}
          width="100%"
          height="100%"
          allow="camera;fullscreen;accelerometer;gyroscope;magnetometer"
          allowFullScreen
        />
      </div>
    </div>
  )
}
