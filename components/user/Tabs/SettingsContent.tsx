import React from 'react'

import * as API from 'apiClient'
import Select from 'components/Form/Select'
import TextField from 'components/Form/TextField'
import { useField } from 'hooks/useForm'
import { FIELDS } from 'pages/signup'

type Props = {
  authedUser: API.ApiUserMetadata
}

const getSocialChoice = (
  authedUser: API.ApiUserMetadata
): { choice: string; value: string } => {
  if (authedUser.discord) {
    return { choice: 'discord', value: authedUser.discord }
  } else if (authedUser.telegram) {
    return { choice: 'telegram', value: authedUser.telegram }
  }
  return { choice: '', value: '' }
}

export default function SettingsContent({ authedUser }: Props) {
  const $email = useField(FIELDS.email)
  const $graffiti = useField(FIELDS.graffiti)
  const $social = useField(FIELDS.social)
  const $country = useField(FIELDS.country)

  const { choice: socialChoice, value: socialValue } =
    getSocialChoice(authedUser)

  return (
    <div className="flex">
      <div className="flex-initial">
        <div className="font-favorit mt-8">User Settings</div>
        {$email && (
          <TextField {...$email} defaultValue={authedUser.email} disabled />
        )}
        {$graffiti && (
          <TextField
            {...$graffiti}
            defaultValue={authedUser.graffiti}
            disabled
          />
        )}
        {$social && (
          <TextField
            {...$social}
            choice={socialChoice}
            defaultValue={socialValue}
            disabled
          />
        )}
        {$country && (
          <Select {...$country} disabled value={authedUser.country_code} />
        )}
      </div>
    </div>
  )
}
