import accountApiRequest from '@/apiRequests/account'
import { cookies } from 'next/headers'
import Profile from './profile'

const MeProfile = async () => {
  const cookieStore = await cookies()

  const sessionToken = cookieStore.get('sessionToken')

  const result = await accountApiRequest.me(sessionToken?.value ?? '')

  return (
    <div>
      <h1>Profile</h1>
      <div>Xin chào {result.payload.data.name}</div>
      <Profile />
    </div>
  )
}

export default MeProfile
