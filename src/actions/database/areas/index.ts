'use server'

import { prisma } from '@/lib/prisma'
import { AreaDto } from './types'
import { UpdateAccessDto } from '../access/types'

export const getAreas = async () => {
  try {
    const res = await prisma.area.findMany({ select })

    return res
  } catch (e) {
    return []
  }
}

export const postArea = async (data: AreaDto) => {
  try {
    const res = await prisma.area.create({
      data,
      select,
    })

    return res
  } catch (e) {
    return null
  }
}

export const putArea = async (id: string, data: UpdateAccessDto) => {
  try {
    const res = await prisma.area.update({
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
