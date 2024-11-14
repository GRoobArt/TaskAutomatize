import { PriorityEnum } from '@prisma/client'

export interface PriorityDto {
  name: PriorityEnum
  notion: string
  number: number
}

export interface UpdatePriorityDto extends Partial<PriorityDto> {
  database?: string
}

export interface PriorityData {
  id: string
  name: string
  notion: string
}
