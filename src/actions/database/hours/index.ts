'use server'

import { prisma } from '@/lib/prisma'
import { HourDto } from './types'

export const getHours = async () => {
  try {
    const res = await prisma.hours.findMany({ select })

    return res
  } catch (e) {
    return []
  }
}

export const postHour = async (data: HourDto) => {
  try {
    const res = await prisma.hours.create({
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
  notion: true,
  name: true,
  time: true,
  area: true,
  action: true,
}
