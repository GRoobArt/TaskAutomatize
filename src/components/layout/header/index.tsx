import { UserAvatar } from './user'
import { ThemeToggle } from './theme'
import { Logout } from './logout'

export const Header = async () => {
  return (
    <header className='p-4 flex justify-between border-b-2 align-center'>
      <UserAvatar />
      <div className='flex gap-4'>
        <ThemeToggle />
        <Logout />
      </div>
    </header>
  )
}
