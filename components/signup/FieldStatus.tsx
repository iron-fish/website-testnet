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
    className={`${
      feedback === FieldStatusFeedback.BAD ? 'bg-alertred' : 'bg-alertyellow'
    } font-favorit text-white text-xs text-center p-2 w-full mt-2 rounded`}
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
