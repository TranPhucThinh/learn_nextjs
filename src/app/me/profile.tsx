'use client'

import { useEffect } from 'react'
import accountApiRequest from '@/apiRequests/account'

export default function Profile() {
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.meClient()
      console.log('fetchRequest ~ result:', result)
    }
    fetchRequest()
  }, [])

  return <div>profile</div>
}
