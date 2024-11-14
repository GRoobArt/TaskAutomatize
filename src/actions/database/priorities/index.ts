'use server'

import { prisma } from '@/lib/prisma'
import { PriorityDto } from './types'
import { UpdateProjectDto } from '../projects/types'

export const getPriorities = async () => {
  try {
    const res = await prisma.priority.findMany({ select })

    return res
  } catch (e) {
    return []
  }
}

export const postPriority = async (data: PriorityDto) => {
  try {
    const res = await prisma.priority.create({
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
