import type { ChangeEvent } from 'react'
import { RawButton } from '../Button'
import { CountryWithCode, countries } from '../../data/countries'
import LoginCTA from './LoginCTA'
import Note from './Note'
import FinePrint from './FinePrint'
import LabelledRow from './LabelledRow'
import TextField from './TextField'

interface SignUpFormProps {
  $country: string
  countryNote: boolean
  setCountry: (_: ChangeEvent) => void
  $email: string
  setEmail: (_: ChangeEvent) => void
  validEmail: () => boolean
  $fields: Record<string, boolean>
  $graffiti: string
  setGraffiti: (_: ChangeEvent) => void
  validGraffiti: () => boolean
  $social: string
  setSocial: (_: ChangeEvent) => void
  validSocial: () => boolean
  submit: () => void
  touch: (_: string) => () => void
}

const FIELDS = [
  { id: 'email', label: 'Email', placeholder: 'Your email' },
  { id: 'graffiti', label: 'Graffiti', placeholder: 'Your tag' },
  { id: 'social', label: 'Discord or Telegram', placeholder: 'Your proof' },
]

export const SignUpForm = ({
  $country,
  countryNote,
  setCountry,
  $email,
  setEmail,
  validEmail,
  validSocial,
  $fields,
  $graffiti,
  setGraffiti,
  validGraffiti,
  $social,
  setSocial,
  submit,
  touch,
}: SignUpFormProps) => (
  <>
    {FIELDS.map(field => ({
      ...field,
      touched: $fields[field.id],
      onBlur: touch(field.id),
      ...(field.id === 'email'
        ? { value: $email, setter: setEmail, valid: validEmail() }
        : field.id === 'graffiti'
        ? {
            value: $graffiti,
            setter: setGraffiti,
            valid: validGraffiti(),
          }
        : { value: $social, setter: setSocial, valid: validSocial() }),
    })).map(props => (
      <TextField {...props} key={props.id} />
    ))}
    <LabelledRow key="country" id="country" label="Country" valid>
      <select onChange={setCountry} value={$country}>
        {countries.map(({ code, name }: CountryWithCode) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </LabelledRow>
    {countryNote && <Note />}
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
