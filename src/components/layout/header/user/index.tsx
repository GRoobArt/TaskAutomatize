import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getSession } from '@/lib/auth'
import { Skeleton } from '@/components/ui/skeleton'

export const UserAvatar = async () => {
  const session = await getSession()

  const name = session?.user?.name

  if (!name)
    return (
      <div>
        <Skeleton className='h-12 w-12 rounded-full' />
      </div>
    )

  const [firtsname, lastname] = name?.split(' ')

  return (
    session && (
      <div className='flex gap-4'>
        <Avatar>
          <AvatarImage />
          <AvatarFallback className='capitalize'>{`${firtsname[0]}${lastname[0]}`}</AvatarFallback>
        </Avatar>
        <div className='capitalize'>
          <p>{firtsname}</p>
        </div>
      </div>
    )
  )
}
