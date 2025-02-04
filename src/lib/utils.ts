/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/hooks/use-toast'
import { clsx, type ClassValue } from 'clsx'
import { decode } from 'jsonwebtoken'
import { UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { EntityError } from './http'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message,
      })
    })
  } else {
    toast({
      variant: 'destructive',
      title: 'Lỗi',
      description: error?.payload?.message ?? 'Lỗi không xác định',
      duration: duration ?? 3000,
    })
  }
}

/**
 * Xóa đi ký tự '/' đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const decodeJWT = <Payload = any>(token: string) => {
  return decode(token) as Payload
}
