import { AreaEnum } from '@prisma/client'

export interface AccessDto {
  name: AreaEnum
}

export interface UpdateAccessDto extends Partial<AccessDto> {}

export interface AccessData {
  id: string
  name: AreaEnum
  users: {
    id: string
    name: string
  }[]
  types: {
    id: string
    name: string
  }[]
}
