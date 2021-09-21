import clsx from 'clsx'
import { Box } from 'components/OffsetBorder/Box'

type GuidelineProps = {
  title: string
  content: string
  behind: string
}

export const Guideline = ({ content, title, behind }: GuidelineProps) => (
  <div className="mb-3">
    <Box behind={behind} background="bg-iflightorange">
      <div className="p-12">
        <h3
          className={clsx(
            'font-extended',
            'mb-4',
            'mt-3',
            'text-3xl',
            'text-left'
          )}
        >
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
