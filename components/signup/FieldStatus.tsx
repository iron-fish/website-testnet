enum FieldStatusFeedback {
  GOOD = 'GOOD',
  BAD = 'BAD',
}

interface FieldStatusProps {
  feedback: FieldStatusFeedback
  text: string
}
export const FieldStatus = ({
  feedback = FieldStatusFeedback.BAD,
  text,
}: FieldStatusProps) => (
  <div
    className={`font-favorit ${
      feedback === FieldStatusFeedback.BAD ? 'bg-alertred' : 'bg-alertyellow'
    } text-white text-xs text-center w-11/12 p-2 sm:w-7/12 mt-2 rounded`}
  >
    {text}
  </div>
)

interface AppliedFieldStatusProps {
  text: string
  size?: string
}

export const FieldError = (props: AppliedFieldStatusProps) => (
  <FieldStatus feedback={FieldStatusFeedback.BAD} {...props} />
)

export const FieldSuccess = (props: AppliedFieldStatusProps) => (
  <FieldStatus feedback={FieldStatusFeedback.GOOD} {...props} />
)

export default FieldStatus
