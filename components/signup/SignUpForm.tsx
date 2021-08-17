import { useState, useEffect } from 'react'
import { RawButton } from '../Button'
import LoginCTA from './LoginCTA'
import Note from './Note'
import FinePrint from './FinePrint'
import TextField from './TextField'
import Select from './Select'
import { Field } from '../../hooks/useForm'
import Loader from '../Loader'

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
  const [$loaded, $setLoaded] = useState<boolean>(false)
  useEffect(() => {
    if (country?.value) {
      $setLoaded(true)
    }
  }, [$loaded, $setLoaded, country])
  return (
    <>
      {$loaded ? (
        <>
          {textFields.map(t => t && <TextField key={t.id} {...t} />)}
          {country && <Select {...country} />}
          {country?.value === 'USA' && (
            <Note>
              <strong>Please note</strong>: US participants are not eligible for
              Iron Fish coin rewards
            </Note>
          )}
          <RawButton
            className="w-full mt-8 max-w-md mb-2 text-lg md:text-xl p-3 md:py-5 md:px-4"
            onClick={submit}
          >
            Sign Up
          </RawButton>
          <FinePrint />
          <LoginCTA />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}
export default SignUpForm
