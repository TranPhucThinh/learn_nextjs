import accountApiRequest from '@/apiRequests/account'
import { cookies } from 'next/headers'
import ProfileForm from './profile-form'

const MeProfile = async () => {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const result = await accountApiRequest.me(sessionToken?.value ?? '')

  return (
    <div>
      <h1>Profile</h1>
      <ProfileForm profile={result.payload.data} />
    </div>
  )
}

export default MeProfile
