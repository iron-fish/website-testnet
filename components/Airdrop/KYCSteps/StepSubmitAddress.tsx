import clsx from 'clsx'
import { JumioFlowContainer } from 'components/Airdrop/JumioFlowContainer/JumioFlowContainer'
import Button from 'components/Button'
import TextField from 'components/Form/TextField'
import { UNSET } from 'utils/forms'
import { useField, WHITESPACE } from 'hooks/useForm'
import { useState } from 'react'
import WalletAddress from '../WalletAddress/WalletAddress'

const publicAddressField = {
  id: 'address',
  label: 'Public Address',
  placeholder: '',
  defaultValue: UNSET,
  validation: (address: string) => address.length == 64,
  defaultErrorText: `A 64-character string is required for public address`,
  whitespace: WHITESPACE.BANNED,
}

const confirmAddressField = {
  id: 'confirmAddress',
  label: 'Confirm Public Address',
  placeholder: '',
  defaultValue: UNSET,
  validation: () => true,
  defaultErrorText: `This field must match the public address above`,
  whitespace: WHITESPACE.BANNED,
}

type Props = {
  storedAddress?: string
  onNext: (address: string) => void
}

export default function StepSubmitAddress({ onNext, storedAddress }: Props) {
  const pubAddress = useField(publicAddressField)
  const confirmPubAddress = useField(confirmAddressField)
  const [hasUserApproval, setHasUserApproval] = useState(false)
  const isNextDisabled = !storedAddress && !hasUserApproval

  return (
    <JumioFlowContainer className="flex">
      <div className={clsx('p-6', 'md:p-12', 'flex', 'flex-col', 'w-full')}>
        <h1 className={clsx('font-extended', 'text-4xl', 'mb-8')}>KYC Form</h1>
        {!storedAddress ? (
          <>
            <p className="mb-2">
              Please provide the public address of the account where you&#39;d
              like your $IRON airdropped.
            </p>
            <p className="mb-2">
              If you need help with the KYC process,{' '}
              <a
                className="underline"
                target="_blank"
                href="https://coda.io/d/_dte_X_jrtqj/KYC-FAQ_su_vf"
                rel="noreferrer"
              >
                please visit our KYC FAQ
              </a>{' '}
              page.
            </p>
            <div className={clsx('flex', 'flex-col')}>
              {pubAddress && (
                <TextField className="max-w-full" {...pubAddress} />
              )}
              {confirmPubAddress && (
                <TextField {...confirmPubAddress} className="max-w-full" />
              )}
            </div>
            <div className={clsx('p-4', 'bg-gray-100', 'mt-4', 'rounded-md')}>
              <label className={clsx('block')}>
                <input
                  type="checkbox"
                  checked={hasUserApproval}
                  onChange={e => {
                    setHasUserApproval(e.target.checked)
                  }}
                ></input>{' '}
                <span className="ml-2">
                  I have backed up my wallet used to create the public address.
                  Iron Fish cannot help me recover my wallet if lost.
                </span>
              </label>
            </div>
          </>
        ) : (
          <>
            <p>Previously submitted public address:</p>
            <WalletAddress address={storedAddress} />
          </>
        )}

        <div className="mb-auto" />
        <div className={clsx('flex', 'justify-end')}>
          <Button
            className={isNextDisabled ? 'opacity-50' : ''}
            onClick={() => {
              if (storedAddress) {
                onNext(storedAddress)
                return
              }

              if (!pubAddress?.valid) {
                pubAddress?.setValid(false)
              } else if (pubAddress?.value !== confirmPubAddress?.value) {
                confirmPubAddress?.setValid(false)
              } else {
                onNext(pubAddress?.value || '')
              }
            }}
            disabled={isNextDisabled}
          >
            Next
          </Button>
        </div>
      </div>
    </JumioFlowContainer>
  )
}
