'use server'

import { prisma } from '@/lib/prisma'
import { SessionDto } from './types'

export const getSession = async (email: string) => {
  try {
    const session = await prisma.session.findMany({
      where: {
        expiresAt: {
          gt: new Date(),
        },
        user: {
          email: email,
        },
      },
      select,
    })

    return session
  } catch (e) {
    return null
  }
}

export const setSession = async (data: SessionDto) => {
  try {
    const res = await prisma.session.create({
      data,
      select,
    })

    return res
  } catch (e) {
    return null
  }
}

export const removeSession = async (email: string) => {
  try {
    await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
        user: {
          email,
        },
      },
    })

    return true
  } catch (e) {
    return false
  }
}

const select = {
  token: true,
  expiresAt: true,
  email: true,
}
