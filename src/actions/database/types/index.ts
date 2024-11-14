'use server'

import { prisma } from '@/lib/prisma'
import { AreaEnum } from '@prisma/client'
import { TypeDto } from './types'

export const getTypes = async (access?: AreaEnum) => {
  try {
    const res = await prisma.type.findMany({
      where: access
        ? {
            access: {
              some: {
                name: access,
              },
            },
          }
        : undefined,
      select,
    })

    return res
  } catch (e: Error | any) {
    console.error(e.message)
    return []
  }
}

export const postType = async (data: TypeDto) => {
  try {
    const res = await prisma.type.create({
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
  form: true,
  access: {
    select: {
      id: true,
      name: true,
    },
  },
}
