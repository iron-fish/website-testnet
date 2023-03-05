import clsx from 'clsx'

export default function WalletAddress({ address }: { address: string }) {
  return (
    <div
      className={clsx('p-4', 'bg-gray-100', 'mt-4', 'rounded-md', 'break-all')}
    >
      <code>{address}</code>
    </div>
  )
}
