import { useState, useEffect, useCallback } from 'react'

import Note from 'components/Form/Note'
import { FieldError } from 'components/Form/FieldStatus'
import Select from 'components/Form/Select'
import TextField from 'components/Form/TextField'
import Button from 'components/Button'
import Loader from 'components/Loader'
// import Debug from 'components/Debug'

import { useField } from 'hooks/useForm'
import { FIELDS } from 'pages/signup'

import { scrollUp } from 'utils/scroll'
import { UNSET } from 'utils/forms'
import { useQueriedToast } from 'hooks/useToast'

import * as API from 'apiClient'
import { TabType } from './index'

type Props = {
  anyBlocksMined: boolean
  user: API.ApiUser | null
  authedUser: API.ApiUserMetadata | null
  toast: ReturnType<typeof useQueriedToast>
  reloadUser: () => void
  onTabChange: (tab: TabType) => unknown
}

const EDITABLE_FIELDS = {
  email: { ...FIELDS.email, validation: () => true, touched: true },
  graffiti: { ...FIELDS.graffiti },
  country: { ...FIELDS.country, useDefault: false },
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
  user,
  authedUser,
  toast,
  reloadUser,
  onTabChange,
}: Props) {
  const [$error, $setError] = useState<string>(UNSET)
  const [$userData, $setUserData] = useState<API.ApiUserMetadata | null>(
    authedUser
  )

  const {
    email: _email = UNSET,
    graffiti: _graffiti = UNSET,
    discord: _discord = UNSET,
    telegram: _telegram = UNSET,
    country_code: _cc = UNSET,
  } = $userData || {}
  const $graffiti = useField({
    ...EDITABLE_FIELDS.graffiti,
    defaultValue: _graffiti,
  })

  const $email = useField({
    ...EDITABLE_FIELDS.email,
    defaultValue: _email,
  })
  const $discord = useField({
    ...EDITABLE_FIELDS.discord,
    defaultValue: _discord,
    touched: !!_discord,
  })
  const $telegram = useField({
    ...EDITABLE_FIELDS.telegram,
    defaultValue: _telegram,
    touched: !!_telegram,
  })

  const $country = useField({
    ...EDITABLE_FIELDS.country,
    defaultValue: _cc,
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
    if (
      !$email ||
      !$graffiti ||
      !$telegram ||
      !$discord ||
      !$country ||
      !authedUser ||
      testInvalid()
    ) {
      return
    }
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

    const result = await API.updateUser(authedUser.id, updates)

    if ('error' in result) {
      const error = '' + result.message
      $setError(error)
    } else {
      toast.setMessage('User settings updated')
      toast.show()
      $graffiti.setTouched(false)
      scrollUp()
      // $setUser(result)
      await reloadUser()
    }
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
  useEffect(() => {
    if (!authedUser) return
    // local cache
    $setUserData(authedUser)
    const canSee =
      authedUser &&
      user &&
      user.graffiti === authedUser.graffiti &&
      user.id === authedUser.id
    // eslint-disable-next-line no-console
    if (!canSee) {
      // if you try to go to /users/x/settings but you're not user x
      onTabChange('weekly')
      toast.setMessage('You are not authorized to go there')
      toast.show()
    }
  }, [
    authedUser,
    authedUser?.id,
    authedUser?.graffiti,
    user,
    user?.graffiti,
    user?.id,
    onTabChange,
    toast,
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
  // */
  // /*
  return (
    <div className="flex">
      <div className="flex-initial">
        {!$userData ? (
          <Loader />
        ) : (
          <>
            <div className="font-favorit mt-8">User Settings</div>
            {$error !== UNSET && <FieldError text={$error} size="text-md" />}
            {$email && <TextField {...$email} disabled />}
            {$graffiti && (
              <TextField {...$graffiti} disabled={anyBlocksMined} />
            )}
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
          </>
        )}
      </div>
    </div>
  )
}
