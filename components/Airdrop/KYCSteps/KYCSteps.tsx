import { useState } from 'react'
import { magic } from 'utils'
import StepConfirmJumioStart from './StepConfirmJumioStart'
import StepJumioIframe from './StepJumioIframe/StepJumioIframe'
import StepKYCComplete from './StepKYCComplete/StepKYCComplete'
import StepSubmitAddress from './StepSubmitAddress'
import { JumioWorkflow } from '../types/JumioTypes'

async function setKycStatusProcessing() {
  try {
    const token = await magic?.user.getIdToken()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kyc/complete`, {
      method: 'POST',
      headers,
      credentials: 'include',
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error setting processing status:', err)
  }
}

type KYCStepsProps = {
  workflow: JumioWorkflow
}

export function KYCSteps({ workflow }: KYCStepsProps) {
  const [step, setStep] = useState(0)
  const [address, setAddress] = useState('')

  return (
    <>
      {step === 0 && (
        <StepSubmitAddress
          storedAddress={workflow.public_address}
          onNext={userAddress => {
            setAddress(userAddress)
            setStep(1)
          }}
        />
      )}
      {step === 1 && (
        <StepConfirmJumioStart
          onNext={() => {
            setStep(2)
          }}
        />
      )}
      {step === 2 && (
        <StepJumioIframe
          workflow={workflow}
          userAddress={address}
          onSuccess={() => {
            setKycStatusProcessing()
            setStep(3)
          }}
        />
      )}
      {step === 3 && <StepKYCComplete />}
    </>
  )
}
