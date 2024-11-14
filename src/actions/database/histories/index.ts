'use server'

import { prisma } from '@/lib/prisma'
import { HistoryDto } from './types'

export const getHistories = async () => {
  try {
    const res = await prisma.history.findMany({
      select,
    })

    return res
  } catch (e) {
    return []
  }
}

export const postHistory = async (data: HistoryDto) => {
  try {
    const res = await prisma.history.create({
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
  action: true,
}
