import { Box } from 'components/OffsetBorder/Box'

type NFTProps = {
  title: string
  content: string
  pic: string
}

export const NFTCard = ({ title, content, pic }: NFTProps) => (
  <div className="mx-2 block min-w-card-sm md:min-w-card-md lg:min-w-card-lg max-w-[22rem]">
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
