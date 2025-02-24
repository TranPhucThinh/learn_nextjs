'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import accountApiRequest from '@/apiRequests/account'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { handleErrorApi } from '@/lib/utils'
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType,
} from '@/schemaValidations/account.schema'
import { zodResolver } from '@hookform/resolvers/zod'

type Profile = AccountResType['data']

const ProfileForm = ({ profile }: { profile: Profile }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name,
    },
  })

  async function onSubmit(values: UpdateMeBodyType) {
    if (loading) return

    setLoading(true)
    try {
      const result = await accountApiRequest.updateMe(values)
      toast({
        description: result.payload.message,
      })
      router.refresh()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
        noValidate
      >
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            placeholder="shadcn"
            type="email"
            value={profile.email}
            readOnly
          />
        </FormControl>
        <FormMessage />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-8 w-full">
          Cập nhật
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm
