import { BrandEnum } from '@prisma/client'

export interface BrandDto {
  name: BrandEnum
}

export interface UpdateBrandDto extends Partial<BrandDto> {}

export interface BrandData {
  id: string
  name: BrandEnum
}
