import { AreaEnum } from '@prisma/client'

export interface AreaDto {
  name: AreaEnum
  notion: string
}

export interface UpdateAreaDto extends Partial<AreaDto> {
  database?: string
}

export interface AreaData {
  id: string
  name: string
  notion: string
}
