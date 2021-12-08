import { useState, useEffect, useCallback } from 'react'

import Note from 'components/Form/Note'
import { FieldError } from 'components/Form/FieldStatus'
import Select from 'components/Form/Select'
import TextField from 'components/Form/TextField'
import Button from 'components/Button'

import { useField } from 'hooks/useForm'
import { FIELDS } from 'pages/signup'

import { scrollUp } from 'utils/scroll'
import { UNSET } from 'utils/forms'
import { useQueriedToast } from 'hooks/useToast'

import * as API from 'apiClient'

type Props = {
  anyBlocksMined: boolean
  authedUser: API.ApiUserMetadata
  toast: ReturnType<typeof useQueriedToast>
  reloadUser: () => void
}

const EDITABLE_FIELDS = {
  discord: {
    ...FIELDS.social,
    required: false,
    options: undefined,
    id: 'discord',
    label: 'Discord',
    placeholder: 'Your Discord username',
    isRadioed: false,
    validation: () => true,
  },
  telegram: {
    ...FIELDS.social,
    required: false,
    options: undefined,
    id: 'telegram',
    label: 'Telegram',
    placeholder: 'Your Telegram username',
    isRadioed: false,
    validation: () => true,
  },
}

export default function SettingsContent({
  anyBlocksMined,
  authedUser,
  toast,
  reloadUser,
}: Props) {
  const [$error, $setError] = useState<string>(UNSET)
  const [$user, $setUser] = useState<API.ApiUserMetadata>(authedUser)
  useEffect(() => {
    // local cache
    // eslint-disable-next-line
    console.log('updating authedUser...')
    $setUser(authedUser)
  }, [authedUser])

  const $graffiti = useField({
    ...FIELDS.graffiti,
    defaultValue: $user.graffiti,
  })

  const $email = useField({
    ...FIELDS.email,
    defaultValue: $user.email,
    touched: true,
  })
  const $discord = useField({
    ...EDITABLE_FIELDS.discord,
    defaultValue: $user.discord,
    touched: !!$user.discord,
  })
  const $telegram = useField({
    ...EDITABLE_FIELDS.telegram,
    defaultValue: $user.telegram,
    touched: !!$user.telegram,
  })

  const $country = useField({
    ...FIELDS.country,
    defaultValue: $user.country_code,
    useDefault: false,
  })
  const testInvalid = useCallback(() => {
    const invalid =
      !$email?.valid ||
      !$graffiti?.valid ||
      !$discord?.valid ||
      !$telegram?.valid ||
      !$country?.valid
    if (invalid) {
      $setError('Please correct the invalid fields below')
      scrollUp()
    } else {
      $setError(UNSET)
    }
    return invalid
  }, [$email, $graffiti, $telegram, $discord, $country])
  const update = useCallback(async () => {
    let timeout: ReturnType<typeof setTimeout>
    /* eslint-disable no-console */
    if (!$email || !$graffiti || !$telegram || !$discord || !$country) {
      console.log('missing field data')
      return
    }
    if (testInvalid()) {
      console.log('invalid data')
      console.log({ $email, $graffiti, $telegram, $discord, $country })
      return
    }
    /* eslint-enable no-console */
    const email = $email?.value
    const graffiti = $graffiti?.value
    const telegram = $telegram?.value
    const discord = $discord?.value
    const country = $country?.value

    const updates = {
      email,
      graffiti,
      telegram,
      discord,
      country_code: country,
    }
    // eslint-disable-next-line no-console
    console.log({ updates })

    const result = await API.updateUser(authedUser.id, updates)

    if ('error' in result) {
      const error = '' + result.message
      $setError(error)
    } else {
      toast.setMessage('User settings updated')
      toast.show()
      $graffiti.setTouched(false)
      scrollUp()
      $setUser(result)
      await reloadUser()
    }
    return () => clearTimeout(timeout)
  }, [
    $email,
    $graffiti,
    $telegram,
    $discord,
    $country,
    authedUser,
    testInvalid,
    toast,
    reloadUser,
  ])
  /*
  return (
    <Debug
      {...{
        anyBlocksMined,
        $error,
        $email,
        $graffiti,
        $discord,
        $telegram,
        $country,
      }}
    />
    )
  */
  //*
  return (
    <div className="flex">
      <div className="flex-initial">
        <div className="font-favorit mt-8">User Settings</div>
        {$error !== UNSET && <FieldError text={$error} size="text-md" />}
        {$email && <TextField {...$email} disabled />}
        {$graffiti && <TextField {...$graffiti} disabled={anyBlocksMined} />}
        {anyBlocksMined && (
          <Note>
            <>
              This graffiti has already mined blocks, so it{' '}
              <strong>cannot be changed.</strong>
            </>
          </Note>
        )}
        {$discord && <TextField {...$discord} />}
        {$telegram && <TextField {...$telegram} />}
        {$country && <Select {...$country} />}
        <Button className="mt-8" onClick={update}>
          Save
        </Button>
      </div>
    </div>
  )
  // */
}
