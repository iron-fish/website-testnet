import { Box } from 'components/OffsetBorder/Box'

type GuidelineProps = {
  title: string
  content: string
  behind: string
}

export const Guideline = ({ content, title, behind }: GuidelineProps) => (
  <div className="mb-3">
    <Box behind={behind} background="bg-iflightorange">
      <div className="m-4 pb-2">
        <h3 className="text-left text-xl md:text-2xl mt-3 mb-4 font-extended">
          {title}
        </h3>
        {content}
      </div>
    </Box>
  </div>
)

export const renderGuidelineColumn = ({
  title,
  content,
  behind,
}: GuidelineProps) => (
  <Guideline title={title} key={title} behind={behind} content={content} />
)

export default Guideline
