import { RawButton } from 'components/Button'
import TextField from 'components/Form/TextField'
import Select from 'components/Form/Select'
import LoginCTA from './LoginCTA'
import FinePrint from './FinePrint'
import { Field } from 'hooks/useForm'

interface SignUpFormProps {
  textFields: (Field | null)[]
  country: Field | null
  submit: () => void
}

export const SignUpForm = ({
  textFields,
  country,
  submit,
}: SignUpFormProps) => {
  return (
    <>
      {textFields.map(t => t && <TextField key={t.id} {...t} />)}
      {country && <Select {...country} />}
      <RawButton
        className="w-full mt-8 max-w-md mb-2 text-lg md:text-xl p-3 md:py-5 md:px-4"
        onClick={submit}
      >
        Sign Up
      </RawButton>
      <FinePrint />
      <LoginCTA />
    </>
  )
}
export default SignUpForm
