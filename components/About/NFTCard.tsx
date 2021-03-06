import clsx from 'clsx'
import { Box } from 'components/OffsetBorder/Box'

type NFTProps = {
  title: string
  content: string
  pic: string
}

export const NFTCard = ({ title, content, pic }: NFTProps) => (
  <div
    className={clsx(
      'mx-4',
      'flex',
      'flex-col',
      'flex-grow',
      'h-full',
      'min-h-full',
      'min-w-card-sm',
      'md:min-w-card-md'
    )}
  >
    <Box
      behind="bg-white h-full"
      className="h-full"
      background="bg-white h-full"
    >
      <div
        className={clsx(
          'pt-14',
          'flex',
          'h-full',
          'flex-col',
          'flex-grow',
          'flex-shrink-0',
          'justify-between',
          'content-between'
        )}
      >
        <div className="px-14 flex flex-col flex-grow min-h-[16rem]">
          <strong className="uppercase text-lg">NFT Reward</strong>
          <h4 className="py-3 font-extended text-4xl">{title}</h4>
          <p className="mt-4 mb-6 text-xl">{content}</p>
        </div>
        <div className={clsx('flex', 'flex-shrink', 'self-end', 'min-h-[50%]')}>
          {/* eslint-disable @next/next/no-img-element */}
          <img src={pic} alt="A nifty NFT" />
        </div>
      </div>
    </Box>
  </div>
)
export default NFTCard
