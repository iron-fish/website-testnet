import clsx from 'clsx'
import { JumioFlowContainer } from 'components/Airdrop/JumioFlowContainer/JumioFlowContainer'
import Button from 'components/Button'
import TextField from 'components/Form/TextField'
import { UNSET } from 'utils/forms'
import { useField, WHITESPACE } from 'hooks/useForm'

const publicAddressField = {
  id: 'address',
  label: 'Public Address',
  placeholder: 'Your Iron Fish public address',
  defaultValue: UNSET,
  validation: () => true,
  defaultErrorText: `Valid email address required`,
  whitespace: WHITESPACE.BANNED,
}

const confirmAddressField = {
  id: 'address',
  label: 'Confirm Public Address',
  placeholder: '',
  defaultValue: UNSET,
  validation: () => true,
  defaultErrorText: `This field must match the public address above`,
  whitespace: WHITESPACE.BANNED,
}

type Props = {
  onNext: (address: string) => void
}

export default function StepSubmitAddress({ onNext }: Props) {
  const pubAddress = useField(publicAddressField)
  const confirmPubAddress = useField(confirmAddressField)

  return (
    <JumioFlowContainer className="flex">
      <div className={clsx('p-6', 'md:p-12', 'flex', 'flex-col')}>
        <h1 className={clsx('font-extended', 'text-4xl', 'mb-8')}>KYC Form</h1>
        <p className="mb-2">
          Please provide the{' '}
          <strong className="underline">public wallet address</strong> of the
          account where you&apos;d like your $IDON airdropped.
        </p>
        <p>
          Once you begin the KYC process, you will not be able to edit your
          address, so please ensure you are submitting the correct address.
        </p>
        <div className={clsx('flex', 'flex-col')}>
          {pubAddress && <TextField className="max-w-full" {...pubAddress} />}
          {confirmPubAddress && (
            <TextField {...confirmPubAddress} className="max-w-full" />
          )}
        </div>
        <div className="mb-auto" />
        <div className={clsx('flex', 'justify-end')}>
          <Button
            onClick={() => {
              if (!pubAddress?.value) {
                pubAddress?.setValid(false)
              } else if (pubAddress?.value !== confirmPubAddress?.value) {
                confirmPubAddress?.setValid(false)
              } else {
                onNext(pubAddress?.value || '')
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </JumioFlowContainer>
  )
}
