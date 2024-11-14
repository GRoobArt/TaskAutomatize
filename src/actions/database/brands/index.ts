'use server'

import { prisma } from '@/lib/prisma'
import { BrandDto } from './types'

export const getBrands = async () => {
  try {
    const res = await prisma.brand.findMany({
      select,
    })

    return res
  } catch (e) {
    return []
  }
}

export const postBrand = async (data: BrandDto) => {
  try {
    const res = await prisma.brand.create({
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
}
