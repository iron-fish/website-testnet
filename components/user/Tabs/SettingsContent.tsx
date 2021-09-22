import React from 'react'

import * as API from 'apiClient'
import Select from 'components/Form/Select'
import TextField from 'components/Form/TextField'
import { useField } from 'hooks/useForm'
import { FIELDS } from 'pages/signup'

type Props = {
  userMetadata: API.ApiUserMetadata
}

const getSocialChoice = (
  userMetaData: API.ApiUserMetadata
): { choice: string; value: string } => {
  if (userMetaData.discord) {
    return { choice: 'discord', value: userMetaData.discord }
  } else if (userMetaData.telegram) {
    return { choice: 'telegram', value: userMetaData.telegram }
  }
  return { choice: '', value: '' }
}

export default function SettingsContent({ userMetadata }: Props) {
  const $email = useField(FIELDS.email)
  const $graffiti = useField(FIELDS.graffiti)
  const $social = useField(FIELDS.social)
  const $country = useField(FIELDS.country)

  const { choice: socialChoice, value: socialValue } =
    getSocialChoice(userMetadata)

  return (
    <div className="flex">
      <div className="flex-initial">
        <div className="font-favorit mt-8">User Settings</div>
        {$email && (
          <TextField {...$email} defaultValue={userMetadata.email} disabled />
        )}
        {$graffiti && (
          <TextField
            {...$graffiti}
            defaultValue={userMetadata.graffiti}
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
          <Select {...$country} disabled value={userMetadata.country_code} />
        )}
      </div>
    </div>
  )
}
