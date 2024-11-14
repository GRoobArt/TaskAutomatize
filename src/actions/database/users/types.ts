import { AreaEnum, Role, WorkEnum } from '@prisma/client'

export interface UserData {
  id: true
  email: true
  name: true
  role: Role
  work: WorkEnum
  accessName: AreaEnum
}
