'use server'

import { prisma } from '@/lib/prisma'

export const getUsers = async () => {
  try {
    const user = await prisma.user.findMany({
      select,
    })

    return user
  } catch (e) {
    return null
  }
}

export const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select,
    })

    return user
  } catch (e) {
    return null
  }
}

export const getUserPassword = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        password: true,
      },
    })

    if (!user) return null

    return user.password
  } catch (e) {
    return null
  }
}

const select = {
  id: true,
  email: true,
  name: true,
  role: true,
  work: true,
  accessName: true,
}
