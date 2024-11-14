'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { FormLoading } from './loading'
import { FormSchema } from './schema'

export function FormLogin() {
  const { data: session } = useSession()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await signIn('credentials', {
      ...data,
      redirect: false,
    })

    !res?.ok &&
      toast({
        title: res?.error || '',
        action: <ToastAction altText='Crear Alert'>Cerrar</ToastAction>,
      })
  }

  if (session) {
    toast({
      title: 'You are already logged in',
      action: <ToastAction altText='Crear Alert'>Cerrar</ToastAction>,
    })

    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
    return <FormLoading />
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-3 lg:max-w-md'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='Email...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!session && <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  )
}
