import clsx from 'clsx'
import Loader from 'components/Loader'
import { useEffect, useRef, useState } from 'react'
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

function useJumioWebUrl(_userAddress: string) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    async function fetchJumioWebUrl() {
      // const response = await fetch('/api/jumio/web')
      // const data = await response.json()
      const data = {
        url: 'https://ironfish.web.amer-1.jumio.ai/web/v4/app?authorizationToken=eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_5XLOw4CMQwE0LukxtLaiT-ho6TlBoljnwAJJMTd2d0bMN2M3nxKvG_Pci0oqlJVsfNG5VKG-33tO0uvm9MAIqzQeDWYQQZ9KeOwtGQ--ImNJ0lWBs8W0IYY2PQAM6ctN1k1c8evjH-4PyJ33c8c_TxjTUHSgNCY0PpA6KgMywfNGDMlWvn-AEaqeFTgAAAA.TIeouQ2FOwhNvtW348y4prGWFL2ith9KoJqkKRTqxj2KJycdziXJxaCNEpSW1qvxNZA9RFDe0utH7zQn4GIshQ&locale=en',
      }
      setUrl(data.url)
    }

    fetchJumioWebUrl()
  }, [])

  return {
    loading: url === '',
    url,
  }
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

  const { loading, url } = useJumioWebUrl(userAddress)

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
