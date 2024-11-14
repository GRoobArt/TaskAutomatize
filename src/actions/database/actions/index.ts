'use server'

import { prisma } from '@/lib/prisma'
import { ActionDto, UpdateActionDto } from './types'

export const getActions = async () => {
  try {
    const res = await prisma.action.findMany({ select })

    return res
  } catch (e) {
    return []
  }
}

export const postAction = async (data: ActionDto) => {
  try {
    const res = await prisma.action.create({
      data,
      select,
    })

    return res
  } catch (e) {
    return null
  }
}

export const updateAction = async (id: string, data: UpdateActionDto) => {
  try {
    const res = await prisma.action.update({
      where: { id },
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
  notion: true,
}
