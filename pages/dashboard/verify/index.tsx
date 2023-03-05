import Loader from 'components/Loader'
import { LoginContext } from 'hooks/useLogin'
import useRequireLogin from 'hooks/useRequireLogin'
import { useGetKycStatus } from 'components/Airdrop/hooks/useGetKycStatus'
import StepJumioError from 'components/Airdrop/KYCSteps/StepJumioError'
import { KYCForm } from 'components/Airdrop/KYCForm/KYCForm'
import { KYCSteps } from 'components/Airdrop/KYCSteps/KYCSteps'

type VerifyProps = {
  showNotification: boolean
  loginContext: LoginContext
}

export default function Verify({
  showNotification,
  loginContext,
}: VerifyProps) {
  const { checkLoading } = loginContext
  useRequireLogin(loginContext)

  const kycStatus = useGetKycStatus()

  if (checkLoading() || kycStatus.loading) {
    return <Loader />
  }

  return (
    <KYCForm loginContext={loginContext} showNotification={showNotification}>
      {!kycStatus.response && <StepJumioError />}
      {kycStatus.response && <KYCSteps workflow={kycStatus.response} />}
    </KYCForm>
  )
}
