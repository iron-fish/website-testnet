import { RawButton } from '../Button'
import LoginCTA from './LoginCTA'
import Note from './Note'
import FinePrint from './FinePrint'
import TextField from './TextField'
import Select from './Select'
import { Field } from '../../hooks/useForm'

interface SignUpFormProps {
  textFields: (Field | null)[]
  country: Field | null
  submit: () => void
}

export const SignUpForm = ({
  textFields,
  country,
  submit,
}: SignUpFormProps) => (
  <>
    {textFields.map(t => t && <TextField key={t.id} {...t} />)}
    {country && <Select {...country} />}
    {country?.value === 'USA' && (
      <Note>
        <strong>Please note</strong>: US participants are not eligible for Iron
        Fish coin rewards
      </Note>
    )}
    <RawButton
      className="w-11/12 sm:w-7/12 mb-4 text-lg md:text-xl p-3 md:py-5 md:px-4"
      onClick={submit}
    >
      Sign Up
    </RawButton>
    <FinePrint />
    <LoginCTA />
  </>
)
export default SignUpForm
