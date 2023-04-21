import TextField from 'components/Form/TextField'
import { UNSET } from 'utils/forms'
import { useField, WHITESPACE } from 'hooks/useForm'
import clsx from 'clsx'
import { useCallback, useMemo, useRef, useState } from 'react'
import { magic } from 'utils'
import { Toast, Alignment } from 'hooks/useToast'

function useToast() {
  const [message, setMessage] = useState('')
  const timeoutRef = useRef<number>()

  return useMemo(() => {
    return {
      message: (msg: string) => {
        setMessage(msg)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          setMessage('')
        }, 5000) as unknown as number
      },
      renderToast: message ? (
        <Toast
          visible
          message={message}
          alignment={Alignment.Top}
          showNotification
        />
      ) : null,
    }
  }, [message])
}

export default function WalletAddress({ address }: { address: string }) {
  const [addressDisplay, setAddressDisplay] = useState(address)

  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const handleSubmit = useCallback(
    async (newAddress: string) => {
      setIsSubmitting(true)

      try {
        const apiKey = (await magic?.user.getIdToken()) ?? ''

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kyc`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            public_address: newAddress,
          }),
        })
        if (!res.ok) {
          throw new Error('Error fetching KYC workflow')
        }
        setAddressDisplay(newAddress)
        toast.message('Wallet address updated successfully.')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        toast.message('Error updating wallet address. Please try again.')
      } finally {
        setIsEditing(false)
        setIsSubmitting(false)
      }
    },
    [toast]
  )

  return (
    <>
      <div>
        <p className={clsx('mb-2', 'text-lg')}>Submitted public address:</p>
        <div
          className={clsx(
            'flex',
            'items-start',
            'flex-col-reverse',
            'md:flex-row',
            'gap-2',
            'md:items-center'
          )}
        >
          <div
            className={clsx(
              'py-2',
              'px-4',
              'bg-gray-100',
              'rounded-md',
              'break-all'
            )}
          >
            <code>{addressDisplay}</code>
          </div>
        </div>
      </div>
      {toast.renderToast}
      {isEditing && (
        <EditAddressModal
          loading={isSubmitting}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )
}

const publicAddressField = {
  id: 'address',
  label: 'Public Address',
  defaultValue: UNSET,
  validation: (address: string) => address.length == 64,
  defaultErrorText: `A 64-character string is required for public address`,
  whitespace: WHITESPACE.BANNED,
}

const confirmAddressField = {
  id: 'confirmAddress',
  label: 'Confirm Public Address',
  defaultValue: UNSET,
  validation: () => true,
  defaultErrorText: `This field must match the public address above`,
  whitespace: WHITESPACE.BANNED,
}

function EditAddressModal({
  onCancel,
  onSubmit,
  loading,
}: {
  onCancel: () => void
  onSubmit: (address: string) => void
  loading: boolean
}) {
  const pubAddress = useField(publicAddressField)
  const confirmPubAddress = useField(confirmAddressField)
  const [hasUserApproval, setHasUserApproval] = useState(false)
  const isNextDisabled = !hasUserApproval

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            {loading && (
              <div className="inset-0 bg-gray-100 bg-opacity-50 absolute z-10 flex items-center justify-center">
                <div
                  className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            )}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-left sm:mt-0 sm:ml-4">
                  <h3
                    className={clsx(
                      'text-xl',
                      'md:text-2xl',
                      'mt-auto',
                      'mb-4'
                    )}
                    id="modal-title"
                  >
                    Edit Wallet Address
                  </h3>
                  <div>
                    <p className="mb-2">
                      Please provide the public address of the account where
                      you&#39;d like your $IRON airdropped.
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
                        <TextField
                          {...confirmPubAddress}
                          className="max-w-full"
                        />
                      )}
                    </div>
                    <div
                      className={clsx(
                        'p-4',
                        'bg-gray-100',
                        'mt-4',
                        'rounded-md'
                      )}
                    >
                      <label className={clsx('block')}>
                        <input
                          type="checkbox"
                          checked={hasUserApproval}
                          onChange={e => {
                            setHasUserApproval(e.target.checked)
                          }}
                        ></input>{' '}
                        <span className="ml-2">
                          I have backed up my wallet used to create the public
                          address. Iron Fish cannot help me recover my wallet if
                          lost.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                disabled={isNextDisabled}
                className={clsx(
                  'inline-flex',
                  'w-full',
                  'justify-center',
                  'rounded-md',
                  'bg-ifpink',
                  'px-3',
                  'py-2',
                  'text-sm',
                  'font-semibold',
                  'shadow-sm',
                  'sm:ml-3',
                  'sm:w-auto',
                  'hover:bg-ifpinkdark',
                  isNextDisabled ? 'opacity-50' : ''
                )}
                onClick={() => {
                  if (!pubAddress?.value || !pubAddress?.valid) {
                    pubAddress?.setValid(false)
                  } else if (pubAddress?.value !== confirmPubAddress?.value) {
                    confirmPubAddress?.setValid(false)
                  } else {
                    onSubmit(pubAddress.value)
                  }
                }}
              >
                Submit
              </button>
              <button
                onClick={onCancel}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
