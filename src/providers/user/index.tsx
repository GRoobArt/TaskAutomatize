'use client'

import { createContext, useState, useMemo, useCallback, useEffect } from 'react'
import { getUser } from '@/actions/database/users'
import { UserData } from '@/actions/database/users/types'
import { useSession } from 'next-auth/react'
import { AreaEnum } from '@prisma/client'

interface UserProviderProps {
  children: React.ReactNode
}

interface UserContextProps {
  role: string
  work: string
  name: string
  access: string
}

export const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: session } = useSession()
  const [name, setName] = useState<string>('')
  const [role, setRole] = useState<string | null>(null)
  const [work, setWork] = useState<string>('')
  const [access, setAccess] = useState<AreaEnum | string>('')
  const [loading, setLoading] = useState<boolean>(true)

  const findUser = useCallback(async () => {
    const email = session?.user?.email as string

    const res = await getUser(email)

    if (!res) return null

    setRole(res.role)
    setWork(res.work)
    setAccess(res.accessName)
    setName(res.name)

    setLoading(false)
  }, [session])

  useEffect(() => {
    if (loading) findUser()
  }, [loading, findUser])

  const value = useMemo(
    () => ({ role, work, name, access } as UserContextProps),
    [role, work, name, access]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
