import { StateEnum, BrandEnum } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'

export interface TaskDto {
  notion?: string
  name: string
  solicitador: string
  endDate?: Date
  description: string
  brands: BrandEnum[]
  project: string
  action: string
  estimate?: EstimateDto
  url?: string
  type: string
  notionUrl?: string
  request?: string
  state?: StateEnum
  area?: string
  priority?: string
  relation?: string
}
export interface EstimateDto {
  start: Date
  end: Date
}

export interface UpdateTaskDto extends Partial<TaskDto> {
  createAt?: Date
  database?: string
}

export interface TaskProps extends TaskData {
  open: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  isSavign?: boolean
  isAdmin?: boolean
  isPermiso?: boolean
  isProperty?: boolean
  isTotalAccess?: boolean
  isRemove?: boolean
}

export interface TaskData {
  id: string
  notion?: string | null
  name: string
  solicitador: string
  url?: string | null
  notionUrl?: string | null
  endDate?: Date | null
  description: string
  state: StateEnum
  type: string
  createdAt: Date
  updatedAt: Date
  estimate?: {
    endDate: Date | null
    startDate: Date | null
  } | null
  priority: string
  priorities: {
    notion: string
    name: string
  }
  numero_project: number
  project: string
  projects: {
    notion: string
    name: string
  }
  brands: {
    name: string
  }[]
  action?: string | null
  actions?: {
    name: string
  } | null
  area: string | null
  areas: {
    name: string
    notion: string
  } | null
}
