import { Box } from 'components/OffsetBorder/Box'

type Props = {
  index: number
  question: string
  answer: string
}

export default function QuestionAnswer({ index, question, answer }: Props) {
  return (
    <Box behind={index % 2 ? 'bg-iflightorange' : 'bg-ifpink'}>
      <div className="p-12">
        <div className="font-extended text-[1.75rem] mb-4">{question}</div>
        <div className="font-favorit text-xl">{answer}</div>
      </div>
    </Box>
  )
}
