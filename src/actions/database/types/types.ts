export interface TypeDto {
  name: string
}

export interface UpdateTypeDto extends Partial<TypeDto> {}

export interface TypeData {
  id: string
  name: string
  form?: string
  access: {
    id: string
    name: string
  }[]
  projects: {
    id?: string
    name?: string
  }[]
}
