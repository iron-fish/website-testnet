import { Box } from 'components/OffsetBorder/Box'

type NFTProps = {
  title: string
  content: string
  pic: string
}

export const NFTCard = ({ title, content, pic }: NFTProps) => {
  return (
    <div
      className="mx-2 block min-w-card-sm md:min-w-card-md lg:min-w-card-lg"
      style={{ maxWidth: '22rem' }}
    >
      <Box>
        <div
          className="p-2 flex flex-col justify-between content-between"
          style={{ minHeight: '34rem' }}
        >
          <strong className="uppercase">NFT Reward</strong>
          <h4 className="py-3 font-extended text-3xl">{title}</h4>
          <p className="mt-4 mb-6">{content}</p>
          {/* eslint-disable-next-line */}
          <img src={pic} />
        </div>
      </Box>
    </div>
  )
}
export default NFTCard
