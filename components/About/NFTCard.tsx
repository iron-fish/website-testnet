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
      'block',
      'min-w-card-sm',
      'min-h-card-sm',
      'max-w-[22rem]',
      'md:min-w-card-md',
      'md:min-h-card-md',
      'lg:min-w-card-lg',
      'lg:min-h-card-lg',
      'lg:min-h-card-lg',
      '2lg:min-h-card-2lg',
      'xl:min-h-card-xl',
      '1.5xl:min-h-card-1.5xl',
      '2xl:min-h-card-2xl',
      '3xl:min-h-card-3xl'
    )}
  >
    <Box behind="bg-white">
      <div
        className="pt-14 flex flex-col justify-between content-between"
        style={{ minHeight: '36rem' }}
      >
        <div className="px-14">
          <strong className="uppercase text-lg">NFT Reward</strong>
          <h4 className="py-3 font-extended text-4xl">{title}</h4>
          <p className="mt-4 mb-6 text-xl">{content}</p>
        </div>
        {/* eslint-disable-next-line */}
        <img src={pic} />
      </div>
    </Box>
  </div>
)
export default NFTCard
