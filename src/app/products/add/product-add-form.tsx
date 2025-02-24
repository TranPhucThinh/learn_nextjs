'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import productApiRequest from '@/apiRequests/product'
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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { handleErrorApi } from '@/lib/utils'
import {
  CreateProductBody,
  CreateProductBodyType,
} from '@/schemaValidations/product.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

function ProductAddForm() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: '',
      price: 0,
      image: '',
      description: '',
    },
  })

  async function onSubmit(values: CreateProductBodyType) {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file as Blob)
      const uploadResult = await productApiRequest.uploadImage(formData)
      const imageUrl = uploadResult.payload.data
      const result = await productApiRequest.create({
        ...values,
        image: imageUrl,
      })
      toast({
        description: result.payload.message,
      })
      router.push('/products')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(' onSubmit={form.handleSubmit ~ error:', error)
        })}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
        noValidate
      >
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
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea placeholder="Mô tả" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hình ảnh</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setFile(file)
                      field.onChange('http://localhost:3000/' + file.name)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {file && (
          <div>
            <Image
              src={URL.createObjectURL(file)}
              width={128}
              height={128}
              alt="privew"
              className="w-32 h-32 object-cover"
            />

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => {
                setFile(null)
                form.setValue('image', '')
                if (inputRef.current) {
                  inputRef.current.value = ''
                }
              }}
            >
              Xóa hình ảnh
            </Button>
          </div>
        )}

        <Button disabled={isLoading} type="submit" className="!mt-8 w-full">
          Thêm sản phẩm
        </Button>
      </form>
    </Form>
  )
}

export default ProductAddForm
