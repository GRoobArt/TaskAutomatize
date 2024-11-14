'use server'

import { prisma } from '@/lib/prisma'
import { AccessDto } from './types'

export const getAccess = async () => {
  try {
    const res = await prisma.access.findMany({
      select,
    })

    return res
  } catch (e) {
    return []
  }
}

export const postAccess = async (data: AccessDto) => {
  try {
    const res = await prisma.access.create({
      data,
      select,
    })

    return res
  } catch (e) {
    return null
  }
}

const select = {
  id: true,
  name: true,
  users: {
    select: {
      id: true,
      name: true,
    },
  },
  types: {
    select: {
      id: true,
      name: true,
    },
  },
}
