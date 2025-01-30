'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import authApiRequest from '@/apiRequests/auth'
import { clientSessionToken } from '@/lib/http'

const Logout = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionToken = searchParams.get('sessionToken')

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    if (sessionToken === clientSessionToken.value)
      authApiRequest.logoutFromNextClientToNextServer(true, signal).then(() => {
        router.push('/login')
      })

    return controller.abort()
  }, [sessionToken, router])

  return <div>Logout</div>
}

export default Logout
