'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftToLine } from 'lucide-react'
import { signOut } from 'next-auth/react'

export const Logout = () => {
  return (
    <Button
      variant='outline'
      size='icon'
      className='rounded-full'
      onClick={(e) => signOut()}>
      <ArrowLeftToLine className='h-[1rem] w-[1rem] rotate-0 scale-100 transition-all' />
    </Button>
  )
}
