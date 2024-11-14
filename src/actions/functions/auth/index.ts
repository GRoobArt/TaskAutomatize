'use server'

import { getUser, getUserPassword } from '@/actions/database/users'
import { comparePass } from '../bcrypt'
import { LoginDto } from './types'

export const signIn = async (credentials: LoginDto) => {
  try {
    const user = await getUser(credentials.email)
    if (!user) throw new Error('User not found.')

    const password = await getUserPassword(credentials.email)
    if (!password) throw new Error('Password not found.')

    const isPassword = await comparePass(credentials.password, password)
    if (!isPassword) throw new Error('Password is incorrect.')

    return user
  } catch (e) {
    console.log('Error in SignIn', (e as Error).message)
    return null
  }
}
